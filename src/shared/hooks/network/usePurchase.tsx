import { AxiosError } from 'axios';
import { useState } from 'react';
import { ToastType } from 'shared/components/snackBar/enum';
import { LIMIT_PAGED } from 'shared/constants/limitPaged';
import {
  IFormFilterPurchase,
  IFormPurchase,
  IPurchaseDTO,
  transformObject,
  transformObjectFilter,
} from 'shared/dtos/IPurchaseDTO';
import PurchaseService from 'shared/services/PurchaseService';
import { InstancePurchase } from 'shared/services/PurchaseService/dtos/ILoadPagedPurchasesDTO';
import { ILoadSumPurchaseDTORequest } from 'shared/services/PurchaseService/dtos/ILoadSumPurchaseDTO';

import { useToastContext } from '../useToastContext';

export function usePurchase() {
  const { addToast } = useToastContext();
  const purchaseService = new PurchaseService();

  const [allPurchases, setAllPurchases] = useState<InstancePurchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [sumPurchasesState, setSumPurchasesState] = useState<number>();

  const [dataActionTable, setDataActionTable] = useState<IPurchaseDTO>();

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [totalPage, setTotalPage] = useState(1);

  const [reloadPage, setReloadPage] = useState(false);

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

  async function handleSubmitCreate(dataForm: IFormPurchase) {
    setLoadingForm(true);
    const data: IPurchaseDTO = transformObject(dataForm);

    try {
      await purchaseService.create(data);
      addToast('Compra cadastrada com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar compra - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
    }
  }

  async function handleSubmitUpdate(dataForm: IFormPurchase) {
    setLoadingForm(true);
    const data: IPurchaseDTO = transformObject(dataForm);

    try {
      await purchaseService.updateById({ ...data, id: dataForm.id });
      addToast('Compra atualizada com sucesso!', ToastType.success);
      setReloadPage(prev => !prev);
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
      addToast('Compra deletada com sucesso!', ToastType.success);
      setReloadPage(prev => !prev);
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

  async function getPurchasesPaged(page?: string) {
    setLoadingPurchases(true);

    try {
      const response = await purchaseService.loadPaged(LIMIT_PAGED, Number(page));
      setAllPurchases(response.instances ?? []);
      setTotalPage(parseInt(response.totalPages.toString(), 10));
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Falha ao buscar compras - ${response?.data?.message}`, ToastType.error);
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
    totalPage,
    reloadPage,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getSumPurchasesToday,
    getSumPurchasesByPeriod,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleSubmitDelete,
    getPurchasesPaged,
    setLoadingPurchases,
  };
}
