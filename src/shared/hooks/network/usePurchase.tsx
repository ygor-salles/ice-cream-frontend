import { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { ToastType } from 'shared/components/snackBar/enum';
import { IFormPurchase, IPurchaseDTO, transformObject } from 'shared/dtos/IPurchaseDTO';
import PurchaseService from 'shared/services/PurchaseService';

import { useToast } from '../useToast';

export function usePurchase() {
  const { addToast } = useToast();
  const providerService = new PurchaseService();

  const [allPurchases, setAllPurchases] = useState<IPurchaseDTO[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [dataActionTable, setDataActionTable] = useState<IPurchaseDTO>();

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleClickEdit = (data: IPurchaseDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IPurchaseDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  const handleCloseModalEdit = () => setShowModalEdit(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);

  async function getPurchases(): Promise<void> {
    setLoadingPurchases(true);

    try {
      const listPurchases = await providerService.loadAll();
      setAllPurchases(listPurchases);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar dados de compra! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingPurchases(false);
    }
  }

  async function handleSubmitCreate(dataForm: IFormPurchase, reset: UseFormReset<IFormPurchase>) {
    setLoadingForm(true);
    const data: IPurchaseDTO = transformObject(dataForm);

    try {
      await providerService.create(data);
      addToast('compra cadastrado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar compra - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
      reset();
    }
  }

  async function handleSubmitUpdate(dataForm: IFormPurchase) {
    setLoadingForm(true);
    const data: IPurchaseDTO = transformObject(dataForm);

    try {
      await providerService.updateById({ ...data, id: dataForm.id });
      addToast('compra atualizado com sucesso!', ToastType.success);
      getPurchases();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar compra! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalEdit(false);
      setLoadingForm(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    setLoadingForm(true);
    try {
      await providerService.deleteById(id);
      addToast('compra deletado com sucesso!', ToastType.success);
      getPurchases();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao deletar compra! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalDelete(false);
      setLoadingForm(false);
    }
  }

  return {
    allPurchases,
    loadingPurchases,
    loadingForm,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getPurchases,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleSubmitDelete,
  };
}
