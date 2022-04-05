export interface ICreateProductDTORequest {
  name: string;
  price: number;
  description: string;
}

export interface ICreateProductDTOResponse {
  name: string;
  price: number;
  description: string;
  id: number;
  created_at: Date;
  updated_at: Date;
}
