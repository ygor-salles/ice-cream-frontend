import { AddBox } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { DialogInfo, Pagination } from 'shared/components';
import { ToastType } from 'shared/components/SnackBar/enum';
import { LIMIT_PAGED } from 'shared/constants/limitPaged';
import { RoutesEnum } from 'shared/constants/routesList';
import { IFormFilterPaymentPage } from 'shared/dtos/IPaymentDTO';
import { usePayment } from 'shared/hooks/network/usePayment';
import { useToastContext } from 'shared/hooks/useToastContext';
import { LayoutBaseDePagina } from 'shared/layouts';

import { FilterPayment } from './components/FilterPayment';
import { PaymentItem } from './components/PaymentItem';

export function Payments(): JSX.Element {
  const {
    allPayments,
    loadingPayments,
    showModalDelete,
    dataActionTable,
    loadingForm,
    totalPage,
    reloadPage,
    searchParams,
    setLoadingPayments,
    handleClickDelete,
    handleCloseModalDelete,
    getPaymentsPaged,
    handleSubmitDelete,
  } = usePayment();

  const { addToast } = useToastContext();

  const [showModalObservation, setShowModalObservation] = useState('');

  const queryParams = useMemo(
    () => ({
      limit: searchParams.get('limit') || `${LIMIT_PAGED}`,
      page: searchParams.get('page') || '1',
      client_id: searchParams.get('client_id'),
      observation: searchParams.get('observation'),
      start_date: searchParams.get('start_date'),
      end_date: searchParams.get('end_date'),
    }),
    [searchParams],
  );

  const handleChangePage = async (page: number) => {
    setLoadingPayments(true);
    await getPaymentsPaged({ ...queryParams, limit: LIMIT_PAGED, page });
  };

  const onSubmitFilter = async (dataForm: IFormFilterPaymentPage) => {
    const hasRangeDate = dataForm.start_date && dataForm.end_date;
    const notRangeDate = !dataForm.start_date && !dataForm.end_date;

    if (hasRangeDate || notRangeDate) {
      await getPaymentsPaged({ ...dataForm, limit: LIMIT_PAGED, page: 1 });
    } else {
      addToast('Deve ser passado as duas datas ou nenhuma data', ToastType.error);
    }
  };

  useEffect(() => {
    getPaymentsPaged({ page: 1, limit: LIMIT_PAGED });
  }, [reloadPage]);

  return (
    <>
      <LayoutBaseDePagina
        titulo="Pagamentos"
        navigatePage={RoutesEnum.PAYMENTS_CREATE}
        textButton="CADASTRAR"
        icon={<AddBox />}
      >
        <FilterPayment onSubmitFilter={onSubmitFilter} loadingPayments={loadingPayments} />

        {loadingPayments ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <>
            {allPayments.map(item => (
              <PaymentItem
                key={item.id}
                detailPayment={item}
                handleClickDelete={handleClickDelete}
                setShowModalObservation={setShowModalObservation}
              />
            ))}

            <Pagination
              count={totalPage}
              page={Number(queryParams.page)}
              onChange={(_, newPage) => handleChangePage(newPage)}
            />
          </>
        )}
      </LayoutBaseDePagina>

      {showModalDelete && dataActionTable && (
        <DialogInfo
          open={showModalDelete}
          handleSubmit={handleSubmitDelete}
          id={dataActionTable?.id}
          handleClose={handleCloseModalDelete}
          textButtonClose="CANCELAR"
          textButtonSubmit="DELETAR"
          title="DELETAR PAGAMENTO"
          text={`Tem certeza que deseja deletar este pagamento? 🤔🤔🤔 \n\n Ao deletar este pagamento irá somatizar a dívida do cliente ❗❗`}
          loading={loadingForm}
        />
      )}

      {!!showModalObservation.length && (
        <Dialog open={!!showModalObservation.length} onClose={() => setShowModalObservation('')}>
          <DialogTitle>Observação</DialogTitle>
          <DialogContent>
            <DialogContentText>{showModalObservation}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModalObservation('')}>OK</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
