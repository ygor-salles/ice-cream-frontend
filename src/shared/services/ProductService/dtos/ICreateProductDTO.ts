import { EnumTypeProduct } from 'shared/dtos/IProductDTO';

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
  created_at: Date;
  updated_at: Date;
}
