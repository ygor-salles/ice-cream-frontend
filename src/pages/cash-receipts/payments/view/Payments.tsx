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
import { useSearchParams } from 'react-router-dom';
import DialogInfo from 'shared/components/dialog/Dialog';
import { Pagination } from 'shared/components/pagination/Pagination';
import { RoutesEnum } from 'shared/constants/routesList';
import { usePayment } from 'shared/hooks/network/usePayment';
import { LayoutBaseDePagina } from 'shared/layouts';

import PaymentItem from './components/PaymentItem';

export function Payments(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    allPayments,
    loadingPayments,
    showModalDelete,
    dataActionTable,
    loadingForm,
    totalPage,
    reloadPage,
    setLoadingPayments,
    handleClickDelete,
    handleCloseModalDelete,
    getPaymentsPaged,
    handleSubmitDelete,
  } = usePayment();

  const page = useMemo(() => {
    return searchParams.get('page') || '1';
  }, [searchParams]);

  const handleChangePage = (page: number) => {
    setLoadingPayments(true);
    setSearchParams({ page: page.toString() }, { replace: true });
  };

  const [showModalObservation, setShowModalObservation] = useState('');

  useEffect(() => {
    getPaymentsPaged(page);
  }, [page, reloadPage]);

  return (
    <>
      <LayoutBaseDePagina
        titulo="Pagamentos"
        navigatePage={RoutesEnum.PAYMENTS_CREATE}
        textButton="CADASTRAR"
        icon={<AddBox />}
      >
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
              page={Number(page)}
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
