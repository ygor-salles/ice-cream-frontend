export interface IClientDTO {
  id?: number;
  name: string;
  phone?: string;
  debit: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormClient {
  id?: number;
  name: string;
  phone?: string;
  debit: string;
}
