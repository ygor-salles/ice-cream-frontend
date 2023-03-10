import { AxiosError } from 'axios';
import { useState } from 'react';
import { ToastType } from 'shared/components/snackBar/enum';
import { IFormProvider, IProviderDTO, transformObject } from 'shared/dtos/IProviderDTO';
import ProviderService from 'shared/services/ProviderService';

import { useToastContext } from '../useToastContext';

export function useProvider() {
  const { addToast } = useToastContext();
  const providerService = new ProviderService();

  const [allProviders, setAllProviders] = useState<IProviderDTO[]>([]);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [dataActionTable, setDataActionTable] = useState<IProviderDTO>();

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleClickEdit = (data: IProviderDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IProviderDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  const handleCloseModalEdit = () => setShowModalEdit(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);

  async function getProviders(): Promise<void> {
    setLoadingProviders(true);

    try {
      const listProviders = await providerService.loadAll();
      setAllProviders(listProviders);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar dados de fornecedor! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingProviders(false);
    }
  }

  async function handleSubmitCreate(dataForm: IFormProvider) {
    setLoadingForm(true);
    const data: IProviderDTO = transformObject(dataForm);

    try {
      await providerService.create(data);
      addToast('Fornecedor cadastrado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar fornecedor - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
    }
  }

  async function handleSubmitUpdate(dataForm: IFormProvider) {
    setLoadingForm(true);
    const data: IProviderDTO = transformObject(dataForm);

    try {
      await providerService.updateById({ ...data, id: dataForm.id });
      addToast('Fornecedor atualizado com sucesso!', ToastType.success);
      getProviders();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar fornecedor! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalEdit(false);
      setLoadingForm(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    setLoadingForm(true);
    try {
      await providerService.deleteById(id);
      addToast('Fornecedor deletado com sucesso!', ToastType.success);
      getProviders();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao deletar fornecedor! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalDelete(false);
      setLoadingForm(false);
    }
  }

  return {
    allProviders,
    loadingProviders,
    loadingForm,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getProviders,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleSubmitDelete,
  };
}
