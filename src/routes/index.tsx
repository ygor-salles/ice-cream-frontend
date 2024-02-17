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
  OrdersActives,
  Login,
} from 'pages';
import SaleDetail from 'pages/cash-receipts/sales/saleDetail/SaleDetail';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants/routesList';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useAuthContext } from 'shared/hooks/useAuthContext';
import { useDrawerContext } from 'shared/hooks/useDrawerContext';
import ProtectedLayout from 'shared/layouts/ProtectedLayout';

import { DRAWER_OPTIONS_EMPLOYEE, DRAWER_OPTIONS_NORMAL, DRAWER_OPTIONS_SUPER } from './constants';

export function AppRoutes() {
  const { role } = useAuthContext();
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions(
      role === EnumRoleUser.SUPER
        ? DRAWER_OPTIONS_SUPER
        : role === EnumRoleUser.NORMAL
        ? DRAWER_OPTIONS_NORMAL
        : DRAWER_OPTIONS_EMPLOYEE,
    );
  }, []);

  return (
    <Routes>
      <Route path={RoutesEnum.LOGIN} element={<Login />} />

      <Route
        path={RoutesEnum.PRODUCT_COMBINATION}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <ProductCombination />
          </ProtectedLayout>
        }
      />

      <Route
        path={RoutesEnum.CASH_RECEIPTS}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <CashReceipts />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.CASH_OUTFLOWS}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <CashOutflows />
          </ProtectedLayout>
        }
      />

      <Route
        path={RoutesEnum.HOME}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.NORMAL, EnumRoleUser.EMPLOYEE]}>
            <Dashboard />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PRODUCTS}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <Products />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.COMBINATIONS}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <Combinations />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.CLIENTS}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <Clients />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.SALES}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE, EnumRoleUser.NORMAL]}>
            <Sales />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PROVIDERS}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <Providers />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PURCHASES}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <Purchases />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.USERS}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.SUPER]}>
            <Users />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PAYMENTS}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <Payments />
          </ProtectedLayout>
        }
      />

      <Route
        path={RoutesEnum.PRODUCTS_CREATE}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <RegisterProduct />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.COMBINATIONS_CREATE}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <RegisterCombination />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.CLIENTS_CREATE}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <RegisterClient />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.SALES_CREATE}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE, EnumRoleUser.NORMAL]}>
            <RegisterSale />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PROVIDERS_CREATE}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <RegisterProvider />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PURCHASES_CREATE}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <RegisterPurchase />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.USERS_CREATE}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.SUPER]}>
            <RegisterUser />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.PAYMENTS_CREATE}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <RegisterPayment />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.DAILY_CASH_CLOSING}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.EMPLOYEE]}>
            <DailyCashClosing />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.ORDERS_ACTIVES}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.NORMAL, EnumRoleUser.EMPLOYEE]}>
            <OrdersActives />
          </ProtectedLayout>
        }
      />
      <Route
        path={RoutesEnum.SALE_DETAIL}
        element={
          <ProtectedLayout accessUser={[EnumRoleUser.NORMAL, EnumRoleUser.EMPLOYEE]}>
            <SaleDetail />
          </ProtectedLayout>
        }
      />

      <Route path="*" element={<Navigate to={RoutesEnum.ORDERS_ACTIVES} />} />
    </Routes>
  );
}
