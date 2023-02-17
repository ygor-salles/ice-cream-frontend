import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

export interface ILoadSumSalesDTORequest {
  startDate: string;
  endDate: string;
  type_sale?: EnumTypeSale;
}

export interface ILoadSumSalesDTOResponse {
  total_sales: number;
}
