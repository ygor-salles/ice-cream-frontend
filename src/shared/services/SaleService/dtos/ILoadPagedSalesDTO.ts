import { IClientDTO, EnumTypeSale } from 'shared/dtos';

import { IDataProduct } from './ICreateSaleDTO';

export interface InstanceSale {
  id: number;
  total: number;
  type_sale: EnumTypeSale;
  observation: string;
  created_at: string;
  updated_at: string;
  in_progress: boolean;
  client_id: number;
  client: IClientDTO;
  data_product: IDataProduct[];
}

export interface ILoadPagedSalesDTOResponse {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
  instances: Array<InstanceSale>;
}

export interface ILoadPagedSalesDTORequest {
  limit: number;
  page: number;
  client_id?: string;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
