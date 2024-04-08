export interface ICreatePaymentDTORequest {
  value: number;
  observation?: string;
  client_id: number;
}

export interface ICreatePaymentDTOResponse {
  value: number;
  observation: string;
  client_id: number;
  id: number;
  created_at: string;
  updated_at: string;
}
