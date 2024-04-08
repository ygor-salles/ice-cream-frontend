export interface IClientDTO {
  id?: number;
  name: string;
  phone?: string;
  debit: number;
  created_at?: string;
  updated_at?: string;
}

export interface IFormClient {
  id?: number;
  name: string;
  phone: string;
  debit: string;
}
