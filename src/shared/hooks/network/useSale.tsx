import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastType } from 'shared/components/SnackBar/enum';
import { localStorageKeys, RoutesEnum } from 'shared/constants';
import { EnumTypeProduct } from 'shared/dtos/IProductDTO';
import {
  IFormCashClosing,
  IFormEditSale,
  IFormFilterSales,
  ISaleDTO,
  transformObjectCashClosing,
  transformObjectEdit,
  transformObjectFilter,
  transformObjectFilterSale,
} from 'shared/dtos/ISaleDTO';
import { ILoadSumPurchaseDTORequest } from 'shared/services/PurchaseService/dtos/ILoadSumPurchaseDTO';
import SaleService from 'shared/services/SaleService';
import {
  ILoadPagedSalesDTORequest,
  InstanceSale,
} from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { IUpdateSaleDTORequest } from 'shared/services/SaleService/dtos/IUpdateSaleDTO';

import { useCache } from '../useCache';
import { useToastContext } from '../useToastContext';

export function useSale() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { addToast } = useToastContext();
  const { setDataLocalStorage } = useCache();
  const saleService = new SaleService();

  const [allSales, setAllSales] = useState<InstanceSale[]>([]);
  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  const [sumSalesState, setSumSalesState] = useState<number>();

  const [totalPage, setTotalPage] = useState(1);

  async function handleSubmitCreate(data: ISaleDTO) {
    setLoadingForm(true);

    try {
      await saleService.create(data);
      addToast('Venda cadastrada com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar venda - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
    }
  }

  async function getSalesPaged(filter: ILoadPagedSalesDTORequest) {
    setLoadingSales(true);

    try {
      const objectFormmated = transformObjectFilterSale(filter);
      setSearchParams(
        {
          ...objectFormmated,
          page: objectFormmated.page.toString(),
          limit: objectFormmated.limit.toString(),
        },
        { replace: true },
      );

      const response = await saleService.loadPaged(objectFormmated);
      setAllSales(response.instances ?? []);
      setTotalPage(parseInt(response.totalPages.toString(), 10));
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar dados - ${response?.data?.message}`, ToastType.error);
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
      setReloadPage(prev => !prev);
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

  async function getSumSalesByPeriod(dataForm: IFormFilterSales): Promise<void> {
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
    }
  }

  async function handleSubmitCreateCashClosing(dataForm: IFormCashClosing) {
    setLoadingForm(true);
    const data = transformObjectCashClosing(dataForm);

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
    }
  }

  async function getSalesActivatedAcai() {
    setLoadingSales(true);

    try {
      const orders = await saleService.loadSalesActivatedAcai();
      const filterOrders = orders.filter(item =>
        item.data_product.find(sub => sub.type === EnumTypeProduct.ACAI),
      );
      setAllSales(filterOrders);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar dados - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingSales(false);
    }
  }

  async function updateSaleById(dataForm: IFormEditSale) {
    setLoadingSales(true);
    const data: IUpdateSaleDTORequest = transformObjectEdit(dataForm);

    try {
      await saleService.updateById(data);
      addToast('Pedido atualizado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar dados - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingSales(false);
      setReloadPage(prev => !prev);
    }
  }

  async function onChangeUpdateSaleById(data: IUpdateSaleDTORequest) {
    setLoadingSales(true);

    try {
      await saleService.updateById(data);
      setDataLocalStorage(localStorageKeys.LAST_ORDER, data);
      addToast('Pedido atualizado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar dados - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingSales(false);
      setReloadPage(prev => !prev);
    }
  }

  async function onReturnActionUpdateSale(lastSale: IUpdateSaleDTORequest) {
    setLoadingSales(true);

    try {
      await saleService.updateById({ ...lastSale, in_progress: true });
      setDataLocalStorage(localStorageKeys.LAST_ORDER, null);
      addToast('Pedido retornado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar dados - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingSales(false);
      setReloadPage(prev => !prev);
    }
  }

  return {
    allSales,
    loadingSales,
    loadingForm,
    totalPage,
    reloadPage,
    sumSalesState,
    searchParams,
    setReloadPage,
    getSalesPaged,
    handleSubmitCreate,
    handleSubmitDelete,
    setLoadingSales,
    getSumSalesToday,
    getSumSalesByPeriod,
    handleSubmitCreateCashClosing,
    getSalesActivatedAcai,
    updateSaleById,
    onChangeUpdateSaleById,
    onReturnActionUpdateSale,
  };
}
