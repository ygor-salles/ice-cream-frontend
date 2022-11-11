import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import SnackBar from '../../../shared/components/snackBar/SnackBar';
import {
  IFormPayment,
  IPaymentDTO,
  transformObjectPayment,
} from '../../../shared/dtos/IPaymentDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import PaymentService from '../../../shared/services/PaymentService';
import { DialogEdit } from './components/DialogEdit';
import { TablePayment } from './components/Table';

export function Payments(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [allPayments, setAllPayments] = useState<IPaymentDTO[]>([]);
  const [dataActionTable, setDataActionTable] = useState<IPaymentDTO>();
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseAlert = () => setOpenToast(false);

  const displayNotificationMessage = (error: boolean, message: string) => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const handleClickEdit = (data: IPaymentDTO) => {
    setDataActionTable(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data: IPaymentDTO) => {
    setDataActionTable(data);
    setShowModalDelete(true);
  };

  async function getPayments(): Promise<void> {
    setLoading(true);
    const paymentService = new PaymentService();

    try {
      const listPayments = await paymentService.loadAll();
      setAllPayments(listPayments);
    } catch (error) {
      const { response } = error as AxiosError;
      displayNotificationMessage(
        true,
        `Error ao buscar dados de pagamentos! - ${response?.data?.message}`,
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitUpdate(dataForm: IFormPayment) {
    const data: IPaymentDTO = transformObjectPayment(dataForm);

    const paymentService = new PaymentService();
    try {
      await paymentService.updateById({ ...data, id: dataForm.id });
      displayNotificationMessage(false, 'Pagamento atualizado com sucesso!');
      getPayments();
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao atualizar pagamento!');
    } finally {
      setShowModalEdit(false);
    }
  }

  async function handleSubmitDelete(id: number) {
    const paymentService = new PaymentService();
    try {
      await paymentService.deleteById(id);
      displayNotificationMessage(false, 'Pagamento deletado com sucesso!');
      getPayments();
    } catch (err) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao deletar pagamento!');
    } finally {
      setShowModalDelete(false);
    }
  }

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <SnackBar
        open={openToast}
        onCloseAlert={handleCloseAlert}
        onCloseSnack={handleCloseAlert}
        message={message}
        severity={error ? 'error' : 'success'}
      />

      <LayoutBaseDePagina
        titulo="Pagamentos"
        navigatePage="/payments/create"
        textButton="CADASTRAR"
        icon="add"
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <TablePayment
            allPayments={allPayments}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
          />
        )}
      </LayoutBaseDePagina>

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          payment={dataActionTable}
          onSubmitUpdate={handleSubmitUpdate}
          handleClose={() => setShowModalEdit(false)}
          open={showModalEdit}
        />
      )}

      {showModalDelete && dataActionTable && (
        <DialogInfo
          open={showModalDelete}
          handleSubmit={handleSubmitDelete}
          id={dataActionTable?.id}
          handleClose={() => setShowModalDelete(false)}
          textButtonClose="CANCELAR"
          textButtonSubmit="DELETAR"
          title="DELETAR CLIENTE"
          text="Tem certeza que deseja deletar este pagamento?"
        />
      )}
    </>
  );
}
