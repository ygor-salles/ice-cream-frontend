export interface IUpdateCombinationDTORequest {
  id?: number;
  name?: string;
  price?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IUpdateCombinationDTOResponse {
  message: string;
}
