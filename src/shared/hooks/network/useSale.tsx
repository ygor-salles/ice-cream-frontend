import { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';

import { ToastType } from '../../components/snackBar/enum';
import { IFormSale, ISaleDTO, transformObject } from '../../dtos/ISaleDTO';
import SaleService from '../../services/SaleService';
import { useToast } from '../useToast';

export function useSale() {
  const { addToast } = useToast();
  const saleService = new SaleService();

  const [allSales, setAllSales] = useState<ISaleDTO[]>([]);
  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  async function getSales(): Promise<void> {
    setLoadingSales(true);

    try {
      const listSales = await saleService.loadAll();
      setAllSales(listSales);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao buscar dados de venda! ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingSales(false);
    }
  }

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

  return {
    allSales,
    loadingSales,
    loadingForm,
    getSales,
    handleSubmitCreate,
  };
}
