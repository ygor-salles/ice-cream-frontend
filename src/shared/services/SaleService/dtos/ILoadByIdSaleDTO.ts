import { EnumTypeSale } from '../../../dtos/ISaleDTO';

export interface ILoadByIdSaleDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  product_id: number;
  client_id?: number;
  created_at: Date;
  updated_at: Date;
}
