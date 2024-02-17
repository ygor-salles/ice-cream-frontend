import { IClientDTO } from 'shared/dtos/IClientDTO';

export interface InstancePayment {
  id: number;
  value: number;
  observation: string;
  created_at: Date | string;
  updated_at: Date | string;
  client_id: number;
  client: IClientDTO;
}

export interface ILoadPagedPaymentsDTOResponse {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  offset: number;
  instances: Array<InstancePayment>;
}

export interface ILoadPagedPaymentsDTORequest {
  limit: number;
  page: number;
  client_id?: string;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
