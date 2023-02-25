import { IClientDTO } from 'shared/dtos/IClientDTO';
import { IProductDTO } from 'shared/dtos/IProductDTO';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

export interface IUpdateSaleDTORequest {
  id?: number;
  total?: number;
  type_sale?: EnumTypeSale;
  observation?: string;
  amount?: number;
  in_progress?: boolean;
  client_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  data_product?: IProductDTO;
  client?: IClientDTO;
}

export interface IUpdateSaleDTOResponse {
  message: string;
}
