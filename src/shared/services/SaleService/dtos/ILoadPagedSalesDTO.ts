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
  product_id: number;
  client: {
    id?: number;
    name: string;
    phone: string;
    debit?: number;
    created_at?: Date | string;
    updated_at?: Date | string;
  };
}

export interface ILoadPagedSalesDTOResponse {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
  instances: Array<InstanceSale>;
}
