import { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';

import { ToastType } from '../../components/snackBar/enum';
import { LIMIT_PAGED } from '../../constants/limitPaged';
import { IFormSale, ISaleDTO, transformObject } from '../../dtos/ISaleDTO';
import SaleService from '../../services/SaleService';
import { InstanceSale } from '../../services/SaleService/dtos/ILoadPagedSalesDTO';
import { useToast } from '../useToast';

export function useSale() {
  const { addToast } = useToast();
  const saleService = new SaleService();

  const [allSales, setAllSales] = useState<InstanceSale[]>([]);
  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

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

  return {
    allSales,
    loadingSales,
    loadingForm,
    totalPage,
    getSalesPaged,
    handleSubmitCreate,
    setLoadingSales,
  };
}
