import { EnumTypeSale } from 'shared/dtos';

import { IDataProduct } from './ICreateSaleDTO';

export interface ILoadByIdSaleDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  amount: number;
  data_product: IDataProduct[];
  client_id?: number;
  created_at: string;
  updated_at: string;
}
