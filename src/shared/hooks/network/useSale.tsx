import { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastType } from 'shared/components/snackBar/enum';
import { LIMIT_PAGED } from 'shared/constants/limitPaged';
import { RoutesEnum } from 'shared/constants/routesList';
import {
  IFormCashClosing,
  IFormFilterSales,
  IFormSale,
  ISaleDTO,
  transformObject,
  transformObjectCashClosing,
  transformObjectFilter,
} from 'shared/dtos/ISaleDTO';
import { ILoadSumPurchaseDTORequest } from 'shared/services/PurchaseService/dtos/ILoadSumPurchaseDTO';
import SaleService from 'shared/services/SaleService';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';

import { useToast } from '../useToast';

export function useSale() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const saleService = new SaleService();

  const [allSales, setAllSales] = useState<InstanceSale[]>([]);
  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  const [sumSalesState, setSumSalesState] = useState<number>();

  const [totalPage, setTotalPage] = useState(1);

  async function handleSubmitCreate(dataForm: IFormSale, reset: UseFormReset<IFormSale>) {
    setLoadingForm(true);
    const data: ISaleDTO = transformObject(dataForm);

    try {
      await saleService.create(data);
      addToast('Venda cadastrada com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar venda - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
      reset();
    }
  }

  async function getSalesPaged(page?: string) {
    setLoadingSales(true);

    try {
      const response = await saleService.loadPaged(LIMIT_PAGED, Number(page));
      setAllSales(response.instances ?? []);
      setTotalPage(parseInt(response.totalPages.toString(), 10));
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Falha ao buscar vendas - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingSales(false);
    }
  }

  async function handleSubmitDelete(id: number): Promise<void> {
    setLoadingForm(true);
    try {
      await saleService.deleteById(id);
      addToast('Venda deletada com sucesso!', ToastType.success);
      navigate(RoutesEnum.SALES);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao deletar venda! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
      setReloadPage(true);
    }
  }

  async function getSumSalesToday(): Promise<void> {
    setLoadingSales(true);
    try {
      const { total_sales } = await saleService.loadSumToday();
      setSumSalesState(total_sales);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(
        `Erro ao buscar soma de vendas do dia! - ${response?.data?.message}`,
        ToastType.error,
      );
    } finally {
      setLoadingSales(false);
    }
  }

  async function getSumSalesByPeriod(
    dataForm: IFormFilterSales,
    reset: UseFormReset<IFormFilterSales>,
  ): Promise<void> {
    setLoadingSales(true);
    const data: ILoadSumPurchaseDTORequest = transformObjectFilter(dataForm);

    try {
      const { total_sales } = await saleService.loadSumByPeriod(data);
      setSumSalesState(total_sales);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(
        `Erro ao buscar soma de vendas do dia por período! - ${response?.data?.message}`,
        ToastType.error,
      );
    } finally {
      setLoadingSales(false);
      reset();
    }
  }

  async function handleSubmitCreateCashClosing(
    dataForm: IFormCashClosing,
    reset: UseFormReset<IFormCashClosing>,
  ) {
    console.log('dataForm', dataForm);
    setLoadingForm(true);
    const data = transformObjectCashClosing(dataForm);
    console.log('data', data);

    try {
      await saleService.createCashClosing(data);
      addToast('Fechamento de caixa registrado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(
        `Erro ao registrar fechamento de caixa - ${response?.data?.message}`,
        ToastType.error,
      );
    } finally {
      setLoadingForm(false);
      reset();
    }
  }

  return {
    allSales,
    loadingSales,
    loadingForm,
    totalPage,
    reloadPage,
    sumSalesState,
    setReloadPage,
    getSalesPaged,
    handleSubmitCreate,
    handleSubmitDelete,
    setLoadingSales,
    getSumSalesToday,
    getSumSalesByPeriod,
    handleSubmitCreateCashClosing,
  };
}
