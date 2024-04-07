import { ReactNode } from 'react';
import { EnumRoleUser } from 'shared/dtos';

export interface ProtectedLayoutProps {
  children: ReactNode;
  accessUser: EnumRoleUser[];
}
