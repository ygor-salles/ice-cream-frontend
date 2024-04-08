import { EnumTypeProduct } from 'shared/dtos';

export interface IUpdateProductDTORequest {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  type?: EnumTypeProduct;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IUpdateProductDTOResponse {
  message: string;
}
