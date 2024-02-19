import { AddBox } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'shared/components';
import { ToastType } from 'shared/components/SnackBar/enum';
import { LIMIT_PAGED } from 'shared/constants/limitPaged';
import { RoutesEnum } from 'shared/constants/routesList';
import { EnumTypeSale, IFormFilterSalePage } from 'shared/dtos/ISaleDTO';
import { useSale } from 'shared/hooks/network/useSale';
import { useToastContext } from 'shared/hooks/useToastContext';
import { LayoutBaseDePagina } from 'shared/layouts';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';

import { FilterSale } from './components/FilterSale';
import { SaleItem } from './components/SaleItem';

export function Sales(): JSX.Element {
  const navigate = useNavigate();

  const {
    allSales,
    getSalesPaged,
    totalPage,
    loadingSales,
    setLoadingSales,
    loadingForm,
    reloadPage,
    searchParams,
  } = useSale();

  const { addToast } = useToastContext();

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

  const handleClickSale = (item: InstanceSale) => {
    if (item.type_sale !== EnumTypeSale.CLOSURE) {
      navigate(RoutesEnum.SALE_DETAIL, { state: { saleDetail: item } });
    } else {
      addToast('Essa venda é um fechamento de caixa, não há mais detalhes', ToastType.success);
    }
  };

  const handleChangePage = async (page: number) => {
    setLoadingSales(true);
    await getSalesPaged({ ...queryParams, limit: LIMIT_PAGED, page });
  };

  const onSubmitFilter = async (dataForm: IFormFilterSalePage) => {
    const hasRangeDate = dataForm.start_date && dataForm.end_date;
    const notRangeDate = !dataForm.start_date && !dataForm.end_date;

    if (hasRangeDate || notRangeDate) {
      await getSalesPaged({ ...dataForm, limit: LIMIT_PAGED, page: 1 });
    } else {
      addToast('Deve ser passado as duas datas ou nenhuma data', ToastType.error);
    }
  };

  useEffect(() => {
    getSalesPaged({ page: 1, limit: LIMIT_PAGED });
  }, [reloadPage]);

  return (
    <LayoutBaseDePagina
      titulo="Vendas"
      navigatePage={RoutesEnum.SALES_CREATE}
      textButton="Cadastrar"
      icon={<AddBox />}
      disabled={loadingSales || loadingForm}
    >
      <>
        <FilterSale onSubmitFilter={onSubmitFilter} loadingSales={loadingSales} />

        {loadingSales ? (
          <Skeleton variant="rectangular" width="100%" height={500} />
        ) : (
          <>
            {allSales.map(item => (
              <SaleItem key={item.id} onClick={() => handleClickSale(item)} detailSale={item} />
            ))}

            <Pagination
              count={totalPage}
              page={Number(queryParams.page)}
              onChange={(_, newPage) => handleChangePage(newPage)}
            />
          </>
        )}
      </>
    </LayoutBaseDePagina>
  );
}
