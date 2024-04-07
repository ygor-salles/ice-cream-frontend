export enum EnumRoleUser {
  SUPER = 'SUPER',
  NORMAL = 'NORMAL',
  EMPLOYEE = 'EMPLOYEE',
  LOGOUT = 'LOGOUT',
}

export interface IUserDTO {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: EnumRoleUser;
  created_at?: Date | string;
  updated_at?: Date | string;
}
export interface IUserDTOEdit {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: EnumRoleUser;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: EnumRoleUser;
}
