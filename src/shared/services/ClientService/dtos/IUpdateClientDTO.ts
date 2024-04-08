export interface IUpdateClientDTORequest {
  id?: number;
  name?: string;
  phone?: string;
  debit?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IUpdateClientDTOResponse {
  message: string;
}
