import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

import { IDataProduct } from './ICreateSaleDTO';

export interface IUpdateSaleDTORequest {
  id: number;
  total?: number;
  type_sale?: EnumTypeSale;
  observation?: string;
  amount?: number;
  in_progress?: boolean;
  client_id?: number;
  data_product?: IDataProduct[];
}

export interface IUpdateSaleDTOResponse {
  message: string;
}
