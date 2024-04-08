export interface ICreateClientDTORequest {
  name: string;
  phone?: string;
  debit: number;
}

export interface ICreateClientDTOResponse {
  name: string;
  phone: string;
  debit: number;
  id: number;
  created_at: string;
  updated_at: string;
}
