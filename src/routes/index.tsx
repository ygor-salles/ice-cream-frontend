import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard, Payments, Products, Providers, Sales, Users, Clients } from '../pages';
import { RegisterClient } from '../pages/clients/register/RegisterClient';
import { RegisterPayment } from '../pages/payments/register/RegisterPayment';
import { RegisterProduct } from '../pages/products/register/RegisterProduct';
import { RegisterProvider } from '../pages/providers/register/RegisterProvider';
import { RegisterSale } from '../pages/sales/register/RegisterSale';
import { RegisterUser } from '../pages/users/register/RegisterUser';
import { useDrawerContext } from '../shared/contexts';

export function AppRoutes() {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Página inicial',
      },
      {
        icon: 'category',
        path: '/products',
        label: 'Produtos',
      },
      {
        icon: 'inventory',
        path: '/clients',
        label: 'Clientes',
      },
      {
        icon: 'sell',
        path: '/sales/create',
        label: 'Vendas',
      },
      {
        icon: 'peoples',
        path: '/providers',
        label: 'Fornecedores',
      },
      {
        icon: 'person',
        path: '/users',
        label: 'Usuários',
      },
      {
        icon: 'payment',
        path: '/payments',
        label: 'Pagamentos',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/users" element={<Users />} />
      <Route path="/payments" element={<Payments />} />

      <Route path="/products/create" element={<RegisterProduct />} />
      <Route path="/clients/create" element={<RegisterClient />} />
      <Route path="/sales/create" element={<RegisterSale />} />
      <Route path="/providers/create" element={<RegisterProvider />} />
      <Route path="/users/create" element={<RegisterUser />} />
      <Route path="/payments/create" element={<RegisterPayment />} />

      <Route path="*" element={<Navigate to="/sales/create" />} />
    </Routes>
  );
}
