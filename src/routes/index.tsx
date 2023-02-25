import {
  Dashboard,
  ProductCombination,
  CashReceipts,
  CashOutflows,
  Sales,
  Users,
  Products,
  Combinations,
  Clients,
  Providers,
  Payments,
  RegisterProduct,
  RegisterCombination,
  RegisterClient,
  RegisterProvider,
  RegisterPayment,
  RegisterSale,
  RegisterUser,
  Purchases,
  RegisterPurchase,
  DailyCashClosing,
  AcaisActives,
} from 'pages';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants/routesList';
import { useDrawerContext } from 'shared/contexts';

export function AppRoutes() {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: RoutesEnum.HOME,
        label: 'Dashboard',
      },
      {
        icon: 'inventory',
        path: RoutesEnum.PRODUCT_COMBINATION,
        label: 'Estoque',
      },
      {
        icon: 'point_of_sale',
        path: RoutesEnum.CASH_RECEIPTS,
        label: 'Entradas',
      },
      {
        icon: 'payments',
        path: RoutesEnum.CASH_OUTFLOWS,
        label: 'Saídas',
      },
      {
        icon: 'groups',
        path: RoutesEnum.USERS,
        label: 'Usuários',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path={RoutesEnum.PRODUCT_COMBINATION} element={<ProductCombination />} />
      <Route path={RoutesEnum.CASH_RECEIPTS} element={<CashReceipts />} />
      <Route path={RoutesEnum.CASH_OUTFLOWS} element={<CashOutflows />} />

      <Route path={RoutesEnum.HOME} element={<Dashboard />} />
      <Route path={RoutesEnum.PRODUCTS} element={<Products />} />
      <Route path={RoutesEnum.COMBINATIONS} element={<Combinations />} />
      <Route path={RoutesEnum.CLIENTS} element={<Clients />} />
      <Route path={RoutesEnum.SALES} element={<Sales />} />
      <Route path={RoutesEnum.PROVIDERS} element={<Providers />} />
      <Route path={RoutesEnum.PURCHASES} element={<Purchases />} />
      <Route path={RoutesEnum.USERS} element={<Users />} />
      <Route path={RoutesEnum.PAYMENTS} element={<Payments />} />

      <Route path={RoutesEnum.PRODUCTS_CREATE} element={<RegisterProduct />} />
      <Route path={RoutesEnum.COMBINATIONS_CREATE} element={<RegisterCombination />} />
      <Route path={RoutesEnum.CLIENTS_CREATE} element={<RegisterClient />} />
      <Route path={RoutesEnum.SALES_CREATE} element={<RegisterSale />} />
      <Route path={RoutesEnum.PROVIDERS_CREATE} element={<RegisterProvider />} />
      <Route path={RoutesEnum.PURCHASES_CREATE} element={<RegisterPurchase />} />
      <Route path={RoutesEnum.USERS_CREATE} element={<RegisterUser />} />
      <Route path={RoutesEnum.PAYMENTS_CREATE} element={<RegisterPayment />} />
      <Route path={RoutesEnum.DAILY_CASH_CLOSING} element={<DailyCashClosing />} />
      <Route path={RoutesEnum.ACAIS_ACTIVES} element={<AcaisActives />} />

      <Route path="*" element={<Navigate to={RoutesEnum.SALES_CREATE} />} />
    </Routes>
  );
}
