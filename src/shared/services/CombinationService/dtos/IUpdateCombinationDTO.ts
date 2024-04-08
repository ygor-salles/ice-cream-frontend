export interface IUpdateCombinationDTORequest {
  id?: number;
  name?: string;
  price?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IUpdateCombinationDTOResponse {
  message: string;
}
