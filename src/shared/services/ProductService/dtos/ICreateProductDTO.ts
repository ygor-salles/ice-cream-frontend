import { EnumTypeProduct } from '../../../dtos/IProductDTO';

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
  id: number;
  created_at: Date;
  updated_at: Date;
}
