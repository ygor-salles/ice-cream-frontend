import { IProviderDTO } from './IProviderDTO';

export interface IPurchaseDTO {
  id?: number;
  value_total: number;
  observation?: string;
  its_ice_cream_shoop: boolean;
  file?: File;
  nf_url?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  provider_id: number;
  provider?: IProviderDTO;
}

export interface IFormPurchase {
  id: number;
  value_total: string;
  observation?: string;
  provider_id: string;
  its_ice_cream_shoop: boolean;
  created_at: string;
  file?: File;
  nf_url?: string;
}

export interface IFormFilterPurchasePage {
  provider_name: string;
  provider_id: string;
  observation: string;
  start_date: string;
  end_date: string;
}
export interface IFormFilterPurchase {
  startDate: string;
  endDate: string;
  its_ice_cream_shoop?: string;
  provider_id?: string;
}
