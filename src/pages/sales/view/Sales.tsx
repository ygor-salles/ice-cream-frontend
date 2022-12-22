import { AddBox } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import DialogInfo from '../../../shared/components/dialog/Dialog';
import { Pagination } from '../../../shared/components/pagination/Pagination';
import { useSale } from '../../../shared/hooks/network/useSale';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { InstanceSale } from '../../../shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import SaleDetailItem from './components/SaleDetailItem';
import SaleItem from './components/SaleItem';

export function Sales(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const { allSales, getSalesPaged, totalPage, loadingSales, setLoadingSales } = useSale();

  const [showDetailItem, setShowDetailItem] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [detailItem, setDetailItem] = useState<InstanceSale>();

  const page = useMemo(() => {
    return searchParams.get('page') || '1';
  }, [searchParams]);

  const handleChangePage = (page: number) => {
    setLoadingSales(true);
    setSearchParams({ page: page.toString() }, { replace: true });
  };

  useEffect(() => {
    getSalesPaged(page);
  }, [page]);

  return (
    <LayoutBaseDePagina
      titulo="Vendas"
      navigatePage="/sales/create"
      textButton="CADASTRAR"
      icon={<AddBox />}
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
        />
      )}

      <DialogInfo
        open={showModalDelete}
        title="Deletar Venda"
        text="Tem certeza que deseja deletar essa venda? 🤔"
        textButtonSubmit="DELETAR"
        textButtonClose="CANCELAR"
        handleClose={() => setShowModalDelete(false)}
        handleSubmit={() => setShowModalDelete(false)}
      />
    </LayoutBaseDePagina>
  );
}
