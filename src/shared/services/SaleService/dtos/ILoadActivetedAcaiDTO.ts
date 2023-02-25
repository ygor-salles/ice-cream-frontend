import { IClientDTO } from 'shared/dtos/IClientDTO';
import { IProductDTO } from 'shared/dtos/IProductDTO';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

export interface ILoadActivetedAcaiDTOResponse {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation: string;
  amount: number;
  created_at: Date | string;
  updated_at: Date | string;
  data_product: IProductDTO;
  in_progress: boolean;
  client_id: number;
  client: IClientDTO;
}
