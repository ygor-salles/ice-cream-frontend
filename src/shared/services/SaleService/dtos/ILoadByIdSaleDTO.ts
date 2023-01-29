import { IProductDTO } from 'shared/dtos/IProductDTO';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

export interface ILoadByIdSaleDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  amount: number;
  data_product: IProductDTO;
  client_id?: number;
  created_at: Date;
  updated_at: Date;
}
