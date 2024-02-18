import { AxiosError } from 'axios';
import { useState } from 'react';
import { ToastType } from 'shared/components/SnackBar/enum';
import { IClientDTO, IFormClient, transformObject } from 'shared/dtos/IClientDTO';
import ClientService from 'shared/services/ClientService';

import { useToastContext } from '../useToastContext';

export function useClient() {
  const { addToast } = useToastContext();
  const clientService = new ClientService();

  const [allClients, setAllClients] = useState<IClientDTO[]>([]);
  const [sumDebitsState, setSumDebitsState] = useState<number>();
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

  async function handleSubmitCreate(dataForm: IFormClient) {
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

  async function getSumDebits() {
    try {
      const { total_debits } = await clientService.loadSumDebits();
      setSumDebitsState(total_debits);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar soma de dívidas! - ${response?.data?.message}`, ToastType.error);
    }
  }

  return {
    allClients,
    loadingClients,
    loadingForm,
    showModalEdit,
    dataActionTable,
    sumDebitsState,
    handleClickEdit,
    handleCloseModalEdit,
    getClients,
    handleSubmitCreate,
    handleSubmitUpdate,
    getSumDebits,
  };
}
