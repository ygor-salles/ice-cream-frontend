import { IClientDTO } from 'shared/dtos/IClientDTO';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

import { IDataProduct } from './ICreateSaleDTO';

export interface ILoadSaleDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  amount: number;
  data_product: IDataProduct[];
  client_id?: number;
  client?: IClientDTO;
  created_at: Date;
  updated_at: Date;
}
