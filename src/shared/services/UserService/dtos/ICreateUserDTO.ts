import { EnumRoleUser } from '../../../dtos/IUserDTO';

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
  created_at: Date;
  updated_at: Date;
}
