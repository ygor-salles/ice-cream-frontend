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
  created_at: Date;
  updated_at: Date;
}
