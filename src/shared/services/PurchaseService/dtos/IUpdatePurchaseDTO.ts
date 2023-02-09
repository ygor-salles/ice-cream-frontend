export interface IUpdatePurchaseDTORequest {
  id: number;
  value_total?: number;
  observation?: string;
  its_ice_cream_shoop?: boolean;
  nf_url?: string;
  created_at?: Date;
  updated_at?: Date;
  provider_id?: number;
}

export interface IUpdatePurchaseDTOResponse {
  message: string;
}
