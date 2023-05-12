import { AxiosError } from 'axios';
import { useState } from 'react';
import { ToastType } from 'shared/components/snackBar/enum';
import { LIMIT_PAGED } from 'shared/constants/limitPaged';
import { IFormPayment, IPaymentDTO, transformObject } from 'shared/dtos/IPaymentDTO';
import PaymentService from 'shared/services/PaymentService';
import { InstancePayment } from 'shared/services/PaymentService/dtos/ILoadPagedPaymentsDTO';

import { useToastContext } from '../useToastContext';

export function usePayment() {
  const { addToast } = useToastContext();
  const paymentService = new PaymentService();

  const [allPayments, setAllPayments] = useState<InstancePayment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [dataActionTable, setDataActionTable] = useState<IPaymentDTO>();

  const [showModalDelete, setShowModalDelete] = useState(false);

  const [reloadPage, setReloadPage] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const handleClickDelete = (data: IPaymentDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  const handleCloseModalDelete = () => setShowModalDelete(false);

  async function getPaymentsPaged(page?: string) {
    setLoadingPayments(true);

    try {
      const response = await paymentService.loadPaged(LIMIT_PAGED, Number(page));
      setAllPayments(response.instances ?? []);
      setTotalPage(parseInt(response.totalPages.toString(), 10));
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Falha ao buscar pagamentos - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingPayments(false);
    }
  }

  async function handleSubmitCreate(dataForm: IFormPayment, debitClient: number) {
    const data: IPaymentDTO = transformObject(dataForm);
    if (debitClient < data.value) {
      addToast('Valor do pagamento é maior que a dívida', ToastType.error);
      return;
    }

    setLoadingForm(true);

    try {
      await paymentService.create(data);
      addToast('Pagamento cadastrado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar pagamento - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    setLoadingForm(true);
    try {
      await paymentService.deleteById(id);
      addToast('Pagamento deletado com sucesso!', ToastType.success);
      setReloadPage(prev => !prev);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Error ao deletar pagamento! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalDelete(false);
      setLoadingForm(false);
    }
  }

  return {
    allPayments,
    loadingPayments,
    loadingForm,
    showModalDelete,
    dataActionTable,
    totalPage,
    reloadPage,
    setLoadingPayments,
    setReloadPage,
    handleClickDelete,
    handleCloseModalDelete,
    getPaymentsPaged,
    handleSubmitCreate,
    handleSubmitDelete,
  };
}
