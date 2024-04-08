export interface IUpdatePaymentDTORequest {
  id?: number;
  value?: number;
  observation?: string;
  client_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IUpdatePaymentDTOResponse {
  message: string;
}
