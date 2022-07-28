export interface ICreateProviderDTORequest {
  name: string;
  phone?: string;
  its_ice_cream_shoop: boolean;
}

export interface ICreateProviderDTOResponse {
  name: string;
  phone?: string;
  its_ice_cream_shoop: boolean;
  id: number;
  created_at: Date;
  updated_at: Date;
}
