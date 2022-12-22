import { IClientDTO } from '../../../dtos/IClientDTO';
import { IProductDTO } from '../../../dtos/IProductDTO';
import { EnumTypeSale } from '../../../dtos/ISaleDTO';

export interface InstanceSale {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation: string;
  amount: number;
  created_at: Date | string;
  updated_at: Date | string;
  client_id: number;
  client: IClientDTO;
  data_product: IProductDTO;
}

export interface ILoadPagedSalesDTOResponse {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
  instances: Array<InstanceSale>;
}
