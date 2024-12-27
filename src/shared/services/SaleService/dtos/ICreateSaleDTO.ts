import { EnumTypeProduct, EnumTypeSale } from 'shared/dtos';

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
  isPaid?: boolean;
  data_product: Array<IDataProduct>;
}

export interface ICreateSaleDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation: string;
  data_product: IDataProduct[];
  in_progress: boolean;
  isPaid: boolean;
  client_id: number;
  created_at: string;
  updated_at: string;
}
