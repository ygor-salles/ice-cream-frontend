import { TypeDefaultOptions } from 'shared/components/SelectApp';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';

export const LISTTYPEUSERS: TypeDefaultOptions[] = [
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
