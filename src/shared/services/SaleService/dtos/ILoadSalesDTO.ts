import { IClientDTO, EnumTypeSale } from 'shared/dtos';

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
  in_progress: boolean;
  isPaid: boolean;
  created_at: string;
  updated_at: string;
}
