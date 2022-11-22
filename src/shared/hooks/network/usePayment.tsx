import { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';

import { ToastType } from '../../components/snackBar/enum';
import { IPaymentDTO, IFormPayment, transformObject } from '../../dtos/IPaymentDTO';
import PaymentService from '../../services/PaymentService';
import { useToast } from '../useToast';

export function usePayment() {
  const { addToast } = useToast();
  const paymentService = new PaymentService();

  const [allPayments, setAllPayments] = useState<IPaymentDTO[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const [dataActionTable, setDataActionTable] = useState<IPaymentDTO>();

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleClickEdit = (data: IPaymentDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IPaymentDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  const handleCloseModalEdit = () => setShowModalEdit(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);

  async function getPayments(): Promise<void> {
    setLoadingPayments(true);

    try {
      const listPayments = await paymentService.loadAll();
      setAllPayments(listPayments);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao buscar dados de pagamento! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingPayments(false);
    }
  }

  async function handleSubmitCreate(dataForm: IFormPayment, reset: UseFormReset<IFormPayment>) {
    setLoadingForm(true);
    const data: IPaymentDTO = transformObject(dataForm);

    try {
      await paymentService.create(data);
      addToast('Paymente cadastrado com sucesso!', ToastType.success);
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao cadastrar pagamento - ${response?.data?.message}`, ToastType.error);
    } finally {
      setLoadingForm(false);
      reset();
    }
  }

  async function handleSubmitUpdate(dataForm: IFormPayment) {
    setLoadingForm(true);
    const data: IPaymentDTO = transformObject(dataForm);

    try {
      await paymentService.updateById({ ...data, id: dataForm.id });
      addToast('Paymente atualizado com sucesso!', ToastType.success);
      getPayments();
    } catch (error) {
      const { response } = error as AxiosError;
      addToast(`Erro ao atualizar pagamento! - ${response?.data?.message}`, ToastType.error);
    } finally {
      setShowModalEdit(false);
      setLoadingForm(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    setLoadingForm(true);
    try {
      await paymentService.deleteById(id);
      addToast('Paymente deletado com sucesso!', ToastType.success);
      getPayments();
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
    showModalEdit,
    showModalDelete,
    dataActionTable,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    getPayments,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleSubmitDelete,
  };
}
