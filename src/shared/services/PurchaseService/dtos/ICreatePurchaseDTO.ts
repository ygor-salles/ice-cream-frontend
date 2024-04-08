export interface ICreatePurchaseDTORequest {
  value_total: number;
  observation?: string;
  its_ice_cream_shoop: boolean;
  created_at?: string;
  file?: File | null;
  provider_id: number;
}

export interface ICreatePurchaseDTOResponse {
  value_total: number;
  observation: string;
  its_ice_cream_shoop: boolean;
  nf_url: string;
  id: number;
  created_at: string;
  updated_at: string;
}
