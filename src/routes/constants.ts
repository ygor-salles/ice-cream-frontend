import { RoutesEnum } from 'shared/constants/routesList';
import { IDrawerOption } from 'shared/contexts/utils/types';

export const DRAWER_OPTIONS_SUPER: IDrawerOption[] = [
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
];

export const DRAWER_OPTIONS_NORMAL: IDrawerOption[] = [
  {
    icon: 'home',
    path: RoutesEnum.HOME,
    label: 'Dashboard',
  },
  {
    icon: 'notifications_active',
    path: RoutesEnum.ACAIS_ACTIVES,
    label: 'Açaís ativos',
  },
  {
    icon: 'point_of_sale',
    path: RoutesEnum.SALES,
    label: 'Vendas',
  },
];

export const DRAWER_OPTIONS_EMPLOYEE: IDrawerOption[] = [
  {
    icon: 'home',
    path: RoutesEnum.HOME,
    label: 'Dashboard',
  },
  {
    icon: 'attach_money',
    path: RoutesEnum.SALES_CREATE,
    label: 'Vendas',
  },
  {
    icon: 'notifications_active',
    path: RoutesEnum.ACAIS_ACTIVES,
    label: 'Açaís ativos',
  },
  {
    icon: 'inventory',
    path: RoutesEnum.PRODUCT_COMBINATION,
    label: 'Estoque',
  },
  {
    icon: 'people',
    path: RoutesEnum.CLIENTS,
    label: 'Clientes',
  },
  {
    icon: 'point_of_sale',
    path: RoutesEnum.DAILY_CASH_CLOSING,
    label: 'Fechamento diário',
  },
];
