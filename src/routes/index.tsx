import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard, Products } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'category',
        path: '/products',
        label: 'Produtos',
      },
      {
        icon: 'inventory',
        path: '/clientes',
        label: 'Clientes',
      },
      {
        icon: 'sell',
        path: '/vendas',
        label: 'Vendas',
      },
      {
        icon: 'peoples',
        path: '/fornecedores',
        label: 'Fornecedores',
      },
      {
        icon: 'person',
        path: '/usuarios',
        label: 'Usuários',
      },
      {
        icon: 'payment',
        path: '/pagamentos',
        label: 'Pagamentos',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
