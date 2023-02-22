import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

export interface ICreateCashClosingDTORequest {
  total: number;
  created_at?: Date | string;
}

export interface ICreateCashClosingDTOResponse {
  total: number;
  type_sale: EnumTypeSale;
  id: number;
  created_at: Date;
  updated_at: Date;
}
