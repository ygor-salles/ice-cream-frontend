import { AddBox, ArrowBack } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DialogInfo from 'shared/components/dialog/Dialog';
import { Pagination } from 'shared/components/pagination/Pagination';
import { RoutesEnum } from 'shared/constants/routesList';
import { EnumTypeSale, IFormSale, transformItemArray } from 'shared/dtos/ISaleDTO';
import { useSale } from 'shared/hooks/network/useSale';
import { LayoutBaseDePagina } from 'shared/layouts';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';

import SaleDetailItem from './components/SaleDetailItem';
import SaleItem from './components/SaleItem';

export function Sales(): JSX.Element {
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

  const [showDetailItem, setShowDetailItem] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [detailItem, setDetailItem] = useState<InstanceSale>();
  const refOldSaleItem = useRef<InstanceSale>(null);

  const onInsertProductInSale = useCallback(
    (data: IFormSale) => {
      if (data) {
        const newItem: IDataProduct = transformItemArray(data);

        if (newItem.combinations.length === 0) {
          delete newItem.combinations;
        }

        setDetailItem(oldValue => ({
          ...oldValue,
          data_product: [...oldValue.data_product, newItem],
          total: oldValue.total + newItem.total,
        }));
      }
    },
    [detailItem],
  );

  const onDeleteProductInSale = useCallback(
    (data: IDataProduct) => {
      if (data && detailItem?.data_product) {
        const newDataProduct = detailItem.data_product.filter(item => item !== data);

        setDetailItem(oldValue => ({
          ...oldValue,
          data_product: [...newDataProduct],
          total: oldValue.total - data.total,
        }));
      }
    },
    [detailItem],
  );

  const page = useMemo(() => {
    return searchParams.get('page') || '1';
  }, [searchParams]);

  const handleChangePage = (page: number) => {
    setLoadingSales(true);
    setSearchParams({ page: page.toString() }, { replace: true });
  };

  const updatedSale = async () => {
    const objectSale = detailItem;
    delete objectSale.client;
    delete objectSale.updated_at;
    delete objectSale.created_at;

    if (!objectSale.observation) {
      delete objectSale.observation;
    }

    if (!objectSale.client_id) {
      delete objectSale.client_id;
    }

    await updateSaleById(objectSale);
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
                  refOldSaleItem.current = item;
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
          oldSaleDetail={refOldSaleItem.current}
          onInsertProductInSale={onInsertProductInSale}
          onDeleteProductInSale={onDeleteProductInSale}
          onSubmitUpdate={updatedSale}
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
