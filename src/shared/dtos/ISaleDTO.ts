import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';

import { IClientDTO } from './IClientDTO';
import { ICombinationDTO } from './ICombinationDTO';
import { IProductDTO } from './IProductDTO';

export enum EnumTypeSale {
  PIX = 'PIX',
  CARD = 'CARTAO',
  MONEY = 'DINHEIRO',
  DEBIT = 'FIADO',
  CLOSURE = 'FECHAMENTO DE CAIXA',
}

export interface ISaleDTO {
  id?: number;
  data_product: IDataProduct[];
  type_sale: EnumTypeSale;
  client_id?: number;
  client?: IClientDTO;
  in_progress?: boolean;
  observation?: string;
  total: number;
  created_at?: string;
  updated_at?: string;
}

export interface IFormSale {
  product_name: string;
  data_product: IProductDTO;
  combinations: ICombinationDTO[];
  type_sale: EnumTypeSale;
  client_name: string;
  client_id: string;
  observation: string;
  amount: string;
  total: string;
}

export interface IFormCashClosing {
  total: string;
  created_at?: string;
}

export interface IFormEditSale {
  id: number;
  observation?: string;
  type_sale: EnumTypeSale;
  created_at?: string;
  updated_at?: string;
  data_product?: IDataProduct[];
  total: number;
  client_id?: number;
  client?: IClientDTO;
  in_progress?: boolean;
}

export interface IFormFilterSales {
  startDate: string;
  endDate: string;
  type_sale?: EnumTypeSale;
}

export interface IFormFilterSalePage {
  client_name?: string;
  client_id?: string;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
