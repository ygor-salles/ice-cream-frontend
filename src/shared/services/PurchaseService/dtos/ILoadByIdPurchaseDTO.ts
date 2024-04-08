import { IProviderDTO } from 'shared/dtos';

export interface ILoadByIdPurchaseDTOResponse {
  id: number;
  value_total: number;
  observation: string;
  its_ice_cream_shoop: boolean;
  nf_url: string;
  created_at: string;
  updated_at: string;
  provider_id: number;
  provider: IProviderDTO;
}
