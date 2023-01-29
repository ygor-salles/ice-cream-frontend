import {
  Dashboard,
  ProductCombination,
  ClientPayment,
  ProviderPurchase,
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
        label: 'Página inicial',
      },
      {
        icon: 'inventory',
        path: RoutesEnum.PRODUCT_COMBINATION,
        label: 'Produtos',
      },
      {
        icon: 'groups',
        path: RoutesEnum.CLIENT_PAYMENT,
        label: 'Clientes',
      },
      {
        icon: 'sell',
        path: RoutesEnum.SALES_CREATE,
        label: 'Vendas',
      },
      {
        icon: 'peoples',
        path: RoutesEnum.PROVIDER_PURCHASE,
        label: 'Fornecedores',
      },
      {
        icon: 'person',
        path: RoutesEnum.USERS,
        label: 'Usuários',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path={RoutesEnum.PRODUCT_COMBINATION} element={<ProductCombination />} />
      <Route path={RoutesEnum.CLIENT_PAYMENT} element={<ClientPayment />} />
      <Route path={RoutesEnum.PROVIDER_PURCHASE} element={<ProviderPurchase />} />

      <Route path={RoutesEnum.HOME} element={<Dashboard />} />
      <Route path={RoutesEnum.PRODUCTS} element={<Products />} />
      <Route path={RoutesEnum.COMBINATIONS} element={<Combinations />} />
      <Route path={RoutesEnum.CLIENTS} element={<Clients />} />
      <Route path={RoutesEnum.SALES} element={<Sales />} />
      <Route path={RoutesEnum.PROVIDERS} element={<Providers />} />
      <Route path={RoutesEnum.USERS} element={<Users />} />
      <Route path={RoutesEnum.PAYMENTS} element={<Payments />} />

      <Route path={RoutesEnum.PRODUCTS_CREATE} element={<RegisterProduct />} />
      <Route path={RoutesEnum.COMBINATIONS_CREATE} element={<RegisterCombination />} />
      <Route path={RoutesEnum.CLIENTS_CREATE} element={<RegisterClient />} />
      <Route path={RoutesEnum.SALES_CREATE} element={<RegisterSale />} />
      <Route path={RoutesEnum.PROVIDERS_CREATE} element={<RegisterProvider />} />
      <Route path={RoutesEnum.USERS_CREATE} element={<RegisterUser />} />
      <Route path={RoutesEnum.PAYMENTS_CREATE} element={<RegisterPayment />} />

      <Route path="*" element={<Navigate to={RoutesEnum.SALES_CREATE} />} />
    </Routes>
  );
}
