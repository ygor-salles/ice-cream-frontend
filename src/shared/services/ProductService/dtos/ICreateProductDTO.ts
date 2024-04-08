import { EnumTypeProduct } from 'shared/dtos';

export interface ICreateProductDTORequest {
  name: string;
  price: number;
  description?: string;
  type: EnumTypeProduct;
}

export interface ICreateProductDTOResponse {
  name: string;
  price: number;
  description: string;
  type: EnumTypeProduct;
  status: boolean;
  id: number;
  created_at: string;
  updated_at: string;
}
