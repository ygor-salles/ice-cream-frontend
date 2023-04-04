import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

import { IDataProduct } from './ICreateSaleDTO';

export interface ILoadByIdSaleDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  amount: number;
  data_product: IDataProduct[];
  client_id?: number;
  created_at: Date;
  updated_at: Date;
}
