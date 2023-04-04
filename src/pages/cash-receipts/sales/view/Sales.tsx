import { AddBox, ArrowBack } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DialogInfo from 'shared/components/dialog/Dialog';
import { Pagination } from 'shared/components/pagination/Pagination';
import { RoutesEnum } from 'shared/constants/routesList';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';
import { useSale } from 'shared/hooks/network/useSale';
import { LayoutBaseDePagina } from 'shared/layouts';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';

import SaleDetailItem from './components/SaleDetailItem';
import SaleItem from './components/SaleItem';

export function Sales(): JSX.Element {
  const [showDetailItem, setShowDetailItem] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [detailItem, setDetailItem] = useState<InstanceSale>();

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    allSales,
    getSalesPaged,
    totalPage,
    loadingSales,
    setLoadingSales,
    handleSubmitDelete,
    loadingForm,
    reloadPage,
    updateSaleById,
  } = useSale();

  const page = useMemo(() => {
    return searchParams.get('page') || '1';
  }, [searchParams]);

  const handleChangePage = (page: number) => {
    setLoadingSales(true);
    setSearchParams({ page: page.toString() }, { replace: true });
  };

  const deletedSale = async () => {
    setShowModalDelete(false);
    await handleSubmitDelete(detailItem.id);
  };

  useEffect(() => {
    getSalesPaged(page);
    setShowDetailItem(false);
  }, [page, reloadPage]);

  return (
    <LayoutBaseDePagina
      titulo="Vendas"
      onClick={showDetailItem ? () => setShowDetailItem(false) : undefined}
      navigatePage={!showDetailItem ? RoutesEnum.SALES_CREATE : undefined}
      textButton={showDetailItem ? 'Voltar' : 'Cadastrar'}
      icon={showDetailItem ? <ArrowBack /> : <AddBox />}
      disabled={loadingSales || loadingForm}
    >
      {!showDetailItem ? (
        loadingSales ? (
          <Skeleton variant="rectangular" width="100%" height={500} />
        ) : (
          <>
            {allSales.map(item => (
              <SaleItem
                key={item.id}
                onClick={() => {
                  setDetailItem(item);
                  setShowDetailItem(true);
                }}
                detailSale={item}
              />
            ))}

            <Pagination
              count={totalPage}
              page={Number(page)}
              onChange={(_, newPage) => handleChangePage(newPage)}
            />
          </>
        )
      ) : (
        <SaleDetailItem
          onClose={() => setShowDetailItem(false)}
          onDeleteSale={() => setShowModalDelete(true)}
          saleDetail={detailItem}
          onSubmitUpdate={updateSaleById}
          loading={loadingSales || loadingForm}
        />
      )}

      <DialogInfo
        open={showModalDelete}
        title="Deletar Venda"
        text={
          detailItem?.type_sale === EnumTypeSale.DEBIT
            ? 'Tem certeza que deseja deletar essa venda? 🤔🤔🤔 Ao deletar uma venda FIADO irá subtratir a dívida do cliente ❗❗'
            : 'Tem certeza que deseja deletar essa venda? 🤔'
        }
        textButtonSubmit="DELETAR"
        textButtonClose="CANCELAR"
        handleClose={() => setShowModalDelete(false)}
        handleSubmit={deletedSale}
        loading={loadingForm}
      />
    </LayoutBaseDePagina>
  );
}
