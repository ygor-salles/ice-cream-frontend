import { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { ToastType } from 'shared/components/snackBar/enum';
import {
  IFormFilterPurchase,
  IFormPurchase,
  IPurchaseDTO,
  transformObject,
  transformObjectFilter,
} from 'shared/dtos/IPurchaseDTO';
import PurchaseService from 'shared/services/PurchaseService';
import { ILoadSumPurchaseDTORequest } from 'shared/services/PurchaseService/dtos/ILoadSumPurchaseDTO';

import { useToast } from '../useToast';

export function usePurchase() {
  const { addToast } = useToast();
  const purchaseService = new PurchaseService();

  const [allPurchases, setAllPurchases] = useState<IPurchaseDTO[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [sumPurchasesState, setSumPurchasesState] = useState<number>();

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
      const listPurchases = await purchaseService.loadAll();
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
      await purchaseService.create(data);
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
      await purchaseService.updateById({ ...data, id: dataForm.id });
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
      await purchaseService.deleteById(id);
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

  async function getSumPurchasesToday(): Promise<void> {
    setLoadingPurchases(true);
    try {
      const { total_purchases } = await purchaseService.loadSumToday();
      setSumPurchasesState(total_purchases);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(
        `Erro ao buscar soma de compras do dia! - ${response?.data?.message}`,
        ToastType.error,
      );
    } finally {
      setLoadingPurchases(false);
    }
  }

  async function getSumPurchasesByPeriod(dataForm: IFormFilterPurchase): Promise<void> {
    const data: ILoadSumPurchaseDTORequest = transformObjectFilter(dataForm);

    setLoadingPurchases(true);
    try {
      const { total_purchases } = await purchaseService.loadSumByPeriod(data);
      setSumPurchasesState(total_purchases);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(
        `Erro ao buscar soma de compras do dia por período! - ${response?.data?.message}`,
        ToastType.error,
      );
    } finally {
      setLoadingPurchases(false);
    }
  }

  return {
    allPurchases,
    loadingPurchases,
    loadingForm,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    sumPurchasesState,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getPurchases,
    getSumPurchasesToday,
    getSumPurchasesByPeriod,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleSubmitDelete,
  };
}
