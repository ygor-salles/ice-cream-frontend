export interface IUpdatePurchaseDTORequest {
  id: number;
  value_total?: number;
  observation?: string;
  its_ice_cream_shoop?: boolean;
  nf_url?: string;
  file?: File;
  created_at?: Date | string;
  updated_at?: Date | string;
  provider_id?: number;
}

export interface IUpdatePurchaseDTOResponse {
  message: string;
}
