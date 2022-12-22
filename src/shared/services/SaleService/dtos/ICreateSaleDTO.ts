import { IProductDTO } from '../../../dtos/IProductDTO';
import { EnumTypeSale } from '../../../dtos/ISaleDTO';

export interface ICreateSaleDTORequest {
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  data_product: IProductDTO;
  client_id?: number;
}

export interface ICreateSaleDTOResponse {
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  amount: number;
  data_product: IProductDTO;
  client_id?: number;
  id: number;
  created_at: Date;
  updated_at: Date;
}
