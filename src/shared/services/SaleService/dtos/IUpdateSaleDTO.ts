import { EnumTypeSale } from '../../../dtos/ISaleDTO';

export interface IUpdateSaleDTORequest {
  id?: number;
  total?: number;
  type_sale?: EnumTypeSale;
  observation?: string;
  product_id?: number;
  client_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IUpdateSaleDTOResponse {
  message: string;
}
