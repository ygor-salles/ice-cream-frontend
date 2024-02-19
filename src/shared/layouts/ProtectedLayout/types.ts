import { ReactNode } from 'react';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';

export interface ProtectedLayoutProps {
  children: ReactNode;
  accessUser: EnumRoleUser[];
}
