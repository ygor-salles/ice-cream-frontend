export interface IUpdatePurchaseDTORequest {
  id: number;
  value_total?: number;
  observation?: string;
  its_ice_cream_shoop?: boolean;
  nf_url?: string;
  file?: File | null;
  created_at?: string;
  updated_at?: string;
  provider_id?: number;
}

export interface IUpdatePurchaseDTOResponse {
  message: string;
}
