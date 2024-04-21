import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { EnumRoleUser, EnumTypeSale, IFormFilterDashboard } from 'shared/dtos';
import { useAuthContext, useClient, useProvider, usePurchase, useSale } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';
import { formatStringDate } from 'shared/utils';

import { CardDashboard } from './components/CardDashboard';
import { FilterDashboard } from './components/FilterDashboard';
import { Container } from './styles';

export function Dashboard() {
  const { role } = useAuthContext();

  const { getSumSalesToday, getSumSalesByPeriod, sumSalesState, loadingSales } = useSale();
  const { getSumPurchasesToday, getSumPurchasesByPeriod, sumPurchasesState, loadingPurchases } =
    usePurchase();
  const { sumDebitsState, getSumDebits } = useClient();
  const { allProviders, getProviders } = useProvider();

  const [loadingRequests, setLoadingRequests] = useState(false);
  const [textDateCardState, setTextDateCardState] = useState('Hoje');

  const total = sumSalesState - sumPurchasesState ?? 0;
  const loading = loadingRequests || loadingPurchases || loadingSales;

  const handleSubmitFilterDash = ({
    startDate,
    endDate,
    its_ice_cream_shoop,
    provider_id,
    type_sale,
  }: IFormFilterDashboard) => {
    setLoadingRequests(true);
    const formmatTypeSale = type_sale && type_sale.length > 0 ? type_sale : undefined;

    Promise.all([
      getSumSalesByPeriod({
        startDate,
        endDate,
        type_sale: formmatTypeSale as EnumTypeSale,
      }),
      getSumPurchasesByPeriod({ endDate, startDate, its_ice_cream_shoop, provider_id }),
    ])
      .then(() => {
        setTextDateCardState(
          startDate === endDate
            ? `${formatStringDate(startDate)}`
            : `${formatStringDate(startDate)} à ${formatStringDate(endDate)}`,
        );
      })
      .finally(() => setLoadingRequests(false));
  };

  useEffect(() => {
    setLoadingRequests(true);
    Promise.all([
      getSumSalesToday(),
      getSumPurchasesToday(),
      getProviders(),
      getSumDebits(),
    ]).finally(() => setLoadingRequests(false));
  }, []);

  return (
    <BaseLayout title="Dashboard">
      <FilterDashboard
        allProviders={allProviders}
        loading={loading}
        onSubmitFilter={handleSubmitFilterDash}
        disabled={role !== EnumRoleUser.SUPER}
      />

      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <Container>
          <CardDashboard type="inflows" dateFormmat={textDateCardState} value={sumSalesState} />
          <CardDashboard
            type="outflows"
            dateFormmat={textDateCardState}
            value={sumPurchasesState}
          />
          <CardDashboard type="profit" dateFormmat={textDateCardState} value={total} />
          <CardDashboard type="debit" dateFormmat={textDateCardState} value={sumDebitsState} />
        </Container>
      )}
    </BaseLayout>
  );
}
