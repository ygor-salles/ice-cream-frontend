export interface IUpdateProviderDTORequest {
  id?: number;
  name?: string;
  phone?: string;
  its_ice_cream_shoop?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IUpdateProviderDTOResponse {
  message: string;
}
