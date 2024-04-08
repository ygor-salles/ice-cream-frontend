import { IClientDTO, EnumTypeSale } from 'shared/dtos';

import { IDataProduct } from './ICreateSaleDTO';

export interface ILoadActivetedAcaiDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation: string;
  created_at: string;
  updated_at: string;
  data_product: IDataProduct[];
  in_progress: boolean;
  client_id: number;
  client: IClientDTO;
}
