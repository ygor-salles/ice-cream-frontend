export interface IUpdateProductDTORequest {
  id: string;
  name?: string;
  price?: string;
  description?: string;
}

export interface IUpdateProductDTOResponse {
  message: string;
}