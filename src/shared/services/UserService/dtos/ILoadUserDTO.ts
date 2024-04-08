import { EnumRoleUser } from 'shared/dtos';

export interface ILoadUserDTOResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  role: EnumRoleUser;
  created_at: string;
  updated_at: string;
}
