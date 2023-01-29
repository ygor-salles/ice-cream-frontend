import { EnumRoleUser } from 'shared/dtos/IUserDTO';

interface TypeUser {
  id: number;
  name: string;
}

export const LISTTYPEUSERS: TypeUser[] = [
  {
    id: 1,
    name: EnumRoleUser.SUPER,
  },
  {
    id: 2,
    name: EnumRoleUser.NORMAL,
  },
  {
    id: 3,
    name: EnumRoleUser.EMPLOYEE,
  },
];
