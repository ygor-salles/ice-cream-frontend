import { IClientDTO } from 'shared/dtos/IClientDTO';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

import { IDataProduct } from './ICreateSaleDTO';

export interface InstanceSale {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation: string;
  created_at: Date | string;
  updated_at: Date | string;
  in_progress: boolean;
  client_id: number;
  client: IClientDTO;
  data_product: IDataProduct[];
}

export interface ILoadPagedSalesFilterDTOResponse {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
  instances: Array<InstanceSale>;
}

export interface ILoadPagedSalesFilterDTORequest {
  limit: number;
  page: number;
  client_id?: string;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
