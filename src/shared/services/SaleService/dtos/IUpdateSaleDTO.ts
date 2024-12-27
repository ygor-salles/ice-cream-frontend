import { EnumTypeSale } from 'shared/dtos';

import { IDataProduct } from './ICreateSaleDTO';

export interface IUpdateSaleDTORequest {
  id: number;
  total?: number;
  type_sale?: EnumTypeSale;
  observation?: string;
  in_progress?: boolean;
  isPaid?: boolean;
  client_id?: number;
  data_product?: IDataProduct[];
}

export interface IUpdateSaleDTOResponse {
  message: string;
}
