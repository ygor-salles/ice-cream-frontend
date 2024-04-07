import { IClientDTO } from './IClientDTO';

export interface IPaymentDTO {
  id?: number;
  value: number;
  observation?: string;
  client_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;

  client?: IClientDTO;
}

export interface IFormPayment {
  id?: number;
  value: string;
  observation?: string;
  client_id: string;
}

export interface IFormFilterPaymentPage {
  client_name: string;
  client_id: string;
  observation: string;
  start_date: string;
  end_date: string;
}
