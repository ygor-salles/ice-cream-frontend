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
  Login,
} from 'pages';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants/routesList';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useDrawerContext } from 'shared/hooks/useDrawerContext';
import ProtectedLayout from 'shared/layouts/ProtectedLayout';

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
      <Route path={RoutesEnum.LOGIN} element={<Login />} />

      <Route
        path={RoutesEnum.PRODUCT_COMBINATION}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <ProductCombination />
          </ProtectedLayout>
        }
      />

      <Route
        path={RoutesEnum.CASH_RECEIPTS}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <CashReceipts />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.CASH_OUTFLOWS}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <CashOutflows />
          </ProtectedLayout>
        }
      />

      <Route
        path={RoutesEnum.HOME}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <Dashboard />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PRODUCTS}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <Products />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.COMBINATIONS}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <Combinations />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.CLIENTS}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <Clients />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.SALES}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <Sales />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PROVIDERS}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <Providers />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PURCHASES}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <Purchases />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.USERS}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <Users />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PAYMENTS}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <Payments />
          </ProtectedLayout>
        }
      />

      <Route
        path={RoutesEnum.PRODUCTS_CREATE}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <RegisterProduct />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.COMBINATIONS_CREATE}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <RegisterCombination />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.CLIENTS_CREATE}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <RegisterClient />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.SALES_CREATE}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <RegisterSale />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PROVIDERS_CREATE}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <RegisterProvider />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PURCHASES_CREATE}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <RegisterPurchase />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.USERS_CREATE}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <RegisterUser />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PAYMENTS_CREATE}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <RegisterPayment />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.DAILY_CASH_CLOSING}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <DailyCashClosing />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.ACAIS_ACTIVES}
        element={
          <ProtectedLayout accessUser={EnumRoleUser.SUPER}>
            <AcaisActives />
          </ProtectedLayout>
        }
      />

      <Route path="*" element={<Navigate to={RoutesEnum.LOGIN} />} />
    </Routes>
  );
}
