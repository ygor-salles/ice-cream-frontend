import { ReactNode } from 'react';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface IAuthResponse {
  token: string;
}

export interface IDescribedUser {
  email: string;
  name: string;
  role: EnumRoleUser;
  iat: number;
  exp: number;
  sub: string;
}

export interface IContext extends IDescribedUser {
  authenticate: (email: string, password: string) => Promise<IDescribedUser | null>;
  logout: () => void;
}
