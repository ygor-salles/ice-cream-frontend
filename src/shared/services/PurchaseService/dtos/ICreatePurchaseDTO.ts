export interface ICreatePurchaseDTORequest {
  value_total: number;
  observation?: string;
  its_ice_cream_shoop: boolean;
  created_at?: string | Date;
  file?: File;
  provider_id: number;
}

export interface ICreatePurchaseDTOResponse {
  value_total: number;
  observation: string;
  its_ice_cream_shoop: boolean;
  nf_url: string;
  id: number;
  created_at: Date;
  updated_at: Date;
}
