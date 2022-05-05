export interface IUpdateProductDTORequest {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IUpdateProductDTOResponse {
  message: string;
}
