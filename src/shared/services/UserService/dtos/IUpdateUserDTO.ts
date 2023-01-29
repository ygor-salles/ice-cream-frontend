import { EnumRoleUser } from 'shared/dtos/IUserDTO';

export interface IUpdateUserDTORequest {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  role?: EnumRoleUser;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IUpdateUserDTOResponse {
  message: string;
}
