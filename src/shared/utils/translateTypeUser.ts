import { EnumRoleUser } from 'shared/dtos';

export const translateTypeUser = (enumUser: EnumRoleUser) => {
  if (enumUser === EnumRoleUser.SUPER) return 'Admin';
  if (enumUser === EnumRoleUser.EMPLOYEE) return 'Funcionário';
  if (enumUser === EnumRoleUser.NORMAL) return 'Comum';
  return EnumRoleUser.NORMAL;
};
