import { IProductDTO } from 'shared/dtos/IProductDTO';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

export interface IUpdateSaleDTORequest {
  id?: number;
  total?: number;
  type_sale?: EnumTypeSale;
  observation?: string;
  amount?: number;
  product: IProductDTO;
  client_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IUpdateSaleDTOResponse {
  message: string;
}
