import { AddBox } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from 'shared/components/pagination/Pagination';
import { ToastType } from 'shared/components/snackBar/enum';
import { LIMIT_PAGED } from 'shared/constants/limitPaged';
import { RoutesEnum } from 'shared/constants/routesList';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';
import { useSale } from 'shared/hooks/network/useSale';
import { useToastContext } from 'shared/hooks/useToastContext';
import { LayoutBaseDePagina } from 'shared/layouts';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';

import FilterSale from './components/FilterSale';
import SaleItem from './components/SaleItem';

export function Sales(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    allSales,
    getSalesPaged,
    totalPage,
    loadingSales,
    setLoadingSales,
    loadingForm,
    reloadPage,
  } = useSale();

  const { addToast } = useToastContext();

  const page = useMemo(() => {
    return searchParams.get('page') || '1';
  }, [searchParams]);

  const handleChangePage = (page: number) => {
    setLoadingSales(true);
    setSearchParams({ page: page.toString() }, { replace: true });
  };

  const handleClickSale = (item: InstanceSale) => {
    if (item.type_sale !== EnumTypeSale.CLOSURE) {
      navigate(RoutesEnum.SALE_DETAIL, { state: { saleDetail: item } });
    } else {
      addToast('Essa venda é um fechamento de caixa, não há mais detalhes', ToastType.success);
    }
  };

  useEffect(() => {
    getSalesPaged({ page: Number(page), limit: LIMIT_PAGED });
  }, [page, reloadPage]);

  return (
    <LayoutBaseDePagina
      titulo="Vendas"
      navigatePage={RoutesEnum.SALES_CREATE}
      textButton="Cadastrar"
      icon={<AddBox />}
      disabled={loadingSales || loadingForm}
    >
      {loadingSales ? (
        <Skeleton variant="rectangular" width="100%" height={500} />
      ) : (
        <>
          <FilterSale getSalesFilterPage={getSalesPaged} />

          {allSales.map(item => (
            <SaleItem key={item.id} onClick={() => handleClickSale(item)} detailSale={item} />
          ))}

          <Pagination
            count={totalPage}
            page={Number(page)}
            onChange={(_, newPage) => handleChangePage(newPage)}
          />
        </>
      )}
    </LayoutBaseDePagina>
  );
}
