import { EnumRoleUser } from 'shared/dtos/IUserDTO';

export interface ILoadByIdUserDTOResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  role: EnumRoleUser;
  created_at: Date;
  updated_at: Date;
}
