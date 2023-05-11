/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddBox } from '@mui/icons-material';
import { Dialog, Skeleton, Theme, useMediaQuery } from '@mui/material';
import dump from 'assets/dump.png';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DialogInfo from 'shared/components/dialog/Dialog';
import { Pagination } from 'shared/components/pagination/Pagination';
import { RoutesEnum } from 'shared/constants/routesList';
import { usePurchase } from 'shared/hooks/network/usePurchase';
import { LayoutBaseDePagina } from 'shared/layouts';
import transformImageUrl from 'shared/utils/transformImageUrl';

import { DialogEdit } from './components/DialogEdit';
import PurchaseItem from './components/PurchaseItem';
import { Close, ImgDialog } from './styles';

export function Purchases(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    allPurchases,
    loadingPurchases,
    showModalEdit,
    showModalDelete,
    dataActionTable,
    loadingForm,
    totalPage,
    reloadPage,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    handleSubmitDelete,
    handleSubmitUpdate,
    getPurchasesPaged,
    setLoadingPurchases,
  } = usePurchase();

  const page = useMemo(() => {
    return searchParams.get('page') || '1';
  }, [searchParams]);

  const handleChangePage = (page: number) => {
    setLoadingPurchases(true);
    setSearchParams({ page: page.toString() }, { replace: true });
  };

  const [showImgUrl, setShowImgUrl] = useState('');

  useEffect(() => {
    getPurchasesPaged(page);
  }, [page, reloadPage]);

  return (
    <>
      <LayoutBaseDePagina
        titulo="Compras"
        navigatePage={RoutesEnum.PURCHASES_CREATE}
        textButton="CADASTRAR"
        icon={<AddBox />}
      >
        {loadingPurchases ? (
          <Skeleton variant="rectangular" width="100%" height={450} />
        ) : (
          <>
            {allPurchases.map(item => (
              <PurchaseItem
                key={item.id}
                detailPurchase={item}
                handleClickEdit={handleClickEdit}
                handleClickDelete={handleClickDelete}
                setShowImgUrl={setShowImgUrl}
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

      {showModalEdit && dataActionTable && (
        <DialogEdit
          smDown={smDown}
          purchase={dataActionTable}
          onSubmitUpdate={handleSubmitUpdate}
          handleClose={handleCloseModalEdit}
          open={showModalEdit}
          loading={loadingForm}
        />
      )}

      {showModalDelete && dataActionTable && (
        <DialogInfo
          open={showModalDelete}
          handleSubmit={handleSubmitDelete}
          id={dataActionTable?.id}
          handleClose={handleCloseModalDelete}
          textButtonClose="CANCELAR"
          textButtonSubmit="DELETAR"
          title="DELETAR COMPRA"
          text="Tem certeza que deseja deletar esta compra?"
          loading={loadingForm}
        />
      )}

      {!!showImgUrl.length && (
        <Dialog open={!!showImgUrl.length} onClose={() => setShowImgUrl('')}>
          <ImgDialog src={showImgUrl.length ? transformImageUrl(showImgUrl) : dump} />
          <Close onClick={() => setShowImgUrl('')} />
        </Dialog>
      )}
    </>
  );
}
