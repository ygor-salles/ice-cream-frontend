import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard, Payments, Products, Providers, Sales, Users, Clients } from '../pages';

export const AppRoutes = () => {
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
        path: '/sales',
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

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
