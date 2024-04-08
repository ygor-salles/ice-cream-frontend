import { EnumTypeSale } from 'shared/dtos';

export interface ICreateCashClosingDTORequest {
  total: number;
  created_at?: string;
}

export interface ICreateCashClosingDTOResponse {
  total: number;
  type_sale: EnumTypeSale;
  id: number;
  created_at: string;
  updated_at: string;
}
