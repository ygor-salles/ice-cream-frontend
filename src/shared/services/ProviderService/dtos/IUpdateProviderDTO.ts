export interface IUpdateProviderDTORequest {
  id?: number;
  name?: string;
  phone?: string;
  its_ice_cream_shoop?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IUpdateProviderDTOResponse {
  message: string;
}
