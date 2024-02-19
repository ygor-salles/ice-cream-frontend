/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddBox } from '@mui/icons-material';
import { Dialog, Skeleton, Theme, useMediaQuery } from '@mui/material';
import { images } from 'assets';
import { useEffect, useMemo, useState } from 'react';
import { DialogInfo, Pagination } from 'shared/components';
import { ToastType } from 'shared/components/SnackBar/enum';
import { LIMIT_PAGED } from 'shared/constants/limitPaged';
import { RoutesEnum } from 'shared/constants/routesList';
import { IFormFilterPurchasePage } from 'shared/dtos/IPurchaseDTO';
import { usePurchase } from 'shared/hooks/network/usePurchase';
import { useToastContext } from 'shared/hooks/useToastContext';
import { LayoutBaseDePagina } from 'shared/layouts';
import transformImageUrl from 'shared/utils/transformImageUrl';

import { DialogEdit } from './components/DialogEdit';
import { FilterPurchase } from './components/FilterPurchase';
import { PurchaseItem } from './components/PurchaseItem';
import { Close, ImgDialog } from './styles';

export function Purchases() {
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
    searchParams,
    handleClickEdit,
    handleClickDelete,
    handleCloseModalEdit,
    handleCloseModalDelete,
    handleSubmitDelete,
    handleSubmitUpdate,
    getPurchasesPaged,
    setLoadingPurchases,
  } = usePurchase();

  const { addToast } = useToastContext();

  const [showImgUrl, setShowImgUrl] = useState('');

  const queryParams = useMemo(
    () => ({
      limit: searchParams.get('limit') || `${LIMIT_PAGED}`,
      page: searchParams.get('page') || '1',
      provider_id: searchParams.get('provider_id'),
      observation: searchParams.get('observation'),
      start_date: searchParams.get('start_date'),
      end_date: searchParams.get('end_date'),
    }),
    [searchParams],
  );

  const handleChangePage = async (page: number) => {
    setLoadingPurchases(true);
    await getPurchasesPaged({ ...queryParams, limit: LIMIT_PAGED, page });
  };

  const onSubmitFilter = async (dataForm: IFormFilterPurchasePage) => {
    const hasRangeDate = dataForm.start_date && dataForm.end_date;
    const notRangeDate = !dataForm.start_date && !dataForm.end_date;

    if (hasRangeDate || notRangeDate) {
      await getPurchasesPaged({ ...dataForm, limit: LIMIT_PAGED, page: 1 });
    } else {
      addToast('Deve ser passado as duas datas ou nenhuma data', ToastType.error);
    }
  };

  useEffect(() => {
    getPurchasesPaged({ page: 1, limit: LIMIT_PAGED });
  }, [reloadPage]);

  return (
    <>
      <LayoutBaseDePagina
        titulo="Compras"
        navigatePage={RoutesEnum.PURCHASES_CREATE}
        textButton="CADASTRAR"
        icon={<AddBox />}
      >
        <FilterPurchase onSubmitFilter={onSubmitFilter} loadingPurchases={loadingPurchases} />

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
              page={Number(queryParams.page)}
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
          <ImgDialog src={showImgUrl.length ? transformImageUrl(showImgUrl) : images.dump} />
          <Close onClick={() => setShowImgUrl('')} />
        </Dialog>
      )}
    </>
  );
}
