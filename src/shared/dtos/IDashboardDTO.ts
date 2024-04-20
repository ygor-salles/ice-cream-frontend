import { EnumTypeSale } from './ISaleDTO';

export interface IFormFilterDashboard {
  startDate: string;
  endDate: string;
  its_ice_cream_shoop?: string;
  provider_id?: string;
  type_sale?: EnumTypeSale | string;
}
