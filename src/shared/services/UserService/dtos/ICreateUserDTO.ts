import { EnumRoleUser } from 'shared/dtos';

export interface ICreateUserDTORequest {
  name: string;
  email: string;
  password: string;
  role: EnumRoleUser;
}

export interface ICreateUserDTOResponse {
  name: string;
  email: string;
  password: string;
  role: EnumRoleUser;
  id: number;
  created_at: string;
  updated_at: string;
}
