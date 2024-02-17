import { IProviderDTO } from 'shared/dtos/IProviderDTO';

export interface InstancePurchase {
  id: number;
  value_total: number;
  its_ice_cream_shoop: boolean;
  observation: string;
  nf_url: string;
  created_at: Date;
  updated_at: Date;
  provider_id: number;
  provider: IProviderDTO;
}

export interface ILoadPagedPurchasesDTOResponse {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
  instances: Array<InstancePurchase>;
}

export interface ILoadPagedPurchasesDTORequest {
  limit: number;
  page: number;
  provider_id?: string;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
