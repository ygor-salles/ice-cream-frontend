import { EnumTypeProduct } from 'shared/dtos/IProductDTO';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

export interface IDataProduct {
  amount: number;
  name: string;
  price: number;
  combinations?: Array<{ name: string; price: number }>;
  total: number;
  type?: EnumTypeProduct;
}
export interface ICreateSaleDTORequest {
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  client_id?: number;
  in_progress?: boolean;
  data_product: Array<IDataProduct>;
}

export interface ICreateSaleDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation: string;
  data_product: IDataProduct[];
  in_progress: boolean;
  client_id: number;
  created_at: Date;
  updated_at: Date;
}
