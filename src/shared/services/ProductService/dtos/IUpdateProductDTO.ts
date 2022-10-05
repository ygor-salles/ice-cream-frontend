import { EnumTypeProduct } from '../../../dtos/IProductDTO';

export interface IUpdateProductDTORequest {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  type?: EnumTypeProduct;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IUpdateProductDTOResponse {
  message: string;
}
