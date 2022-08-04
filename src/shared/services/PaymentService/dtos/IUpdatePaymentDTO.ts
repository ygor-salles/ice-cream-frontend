export interface IUpdatePaymentDTORequest {
  id?: number;
  value?: number;
  observation?: string;
  client_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IUpdatePaymentDTOResponse {
  message: string;
}
