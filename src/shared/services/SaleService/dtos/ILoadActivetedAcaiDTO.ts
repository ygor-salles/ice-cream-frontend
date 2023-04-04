import { IClientDTO } from 'shared/dtos/IClientDTO';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

import { IDataProduct } from './ICreateSaleDTO';

export interface ILoadActivetedAcaiDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation: string;
  created_at: Date | string;
  updated_at: Date | string;
  data_product: IDataProduct[];
  in_progress: boolean;
  client_id: number;
  client: IClientDTO;
}
