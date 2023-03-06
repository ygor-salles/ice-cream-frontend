import { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { ToastType } from 'shared/components/snackBar/enum';
import { IClientDTO, IFormClient, transformObject } from 'shared/dtos/IClientDTO';
import ClientService from 'shared/services/ClientService';

import { useToastContext } from '../useToastContext';

export function useClient() {
  const { addToast } = useToastContext();
  const clientService = new ClientService();

  const [allClients, setAllClients] = useState<IClientDTO[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [dataActionTable, setDataActionTable] = useState<IClientDTO>();

  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleClickEdit = (data: IClientDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleCloseModalEdit = () => setShowModalEdit(false);

  async function getClients(): Promise<void> {
    setLoadingClients(true);

    try {
      const listClients = await clientService.loadAll();
      setAllClients(listClients);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar dados de cliente! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingClients(false);
    }
  }

  async function handleSubmitCreate(dataForm: IFormClient, reset: UseFormReset<IFormClient>) {
    setLoadingForm(true);
    const data: IClientDTO = transformObject(dataForm);

    try {
      await clientService.create(data);
      addToast('Cliente cadastrado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar cliente - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
      reset();
    }
  }

  async function handleSubmitUpdate(dataForm: IFormClient) {
    setLoadingForm(true);
    const data: IClientDTO = transformObject(dataForm);

    try {
      await clientService.updateById({ ...data, id: dataForm.id });
      addToast('Cliente atualizado com sucesso!', ToastType.success);
      getClients();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar cliente! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalEdit(false);
      setLoadingForm(false);
    }
  }

  return {
    allClients,
    loadingClients,
    loadingForm,
    showModalEdit,
    dataActionTable,
    handleClickEdit,
    handleCloseModalEdit,
    getClients,
    handleSubmitCreate,
    handleSubmitUpdate,
  };
}
