import { EnumRoleUser } from 'shared/dtos/IUserDTO';

export const translateTypeUser = (enumUser: EnumRoleUser) => {
  if (enumUser === EnumRoleUser.SUPER) return 'Admin';
  if (enumUser === EnumRoleUser.EMPLOYEE) return 'Funcionário';
  if (enumUser === EnumRoleUser.NORMAL) return 'Comum';
};
