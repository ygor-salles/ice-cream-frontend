import { EnumRoleUser, IUserDTO } from 'shared/dtos';
import * as yup from 'yup';

export const fieldsUser = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  ROLE: 'role',
};

export const schemaCreateUser = yup.object().shape({
  [fieldsUser.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsUser.EMAIL]: yup.string().email('Should be e-mail').required('E-mail is required'),
  [fieldsUser.PASSWORD]: yup.string().required('Password is required'),
  [fieldsUser.ROLE]: yup
    .mixed<keyof typeof EnumRoleUser>()
    .oneOf(Object.values(EnumRoleUser))
    .required('Type user is required'),
});

export const schemaEditUser = yup.object().shape({
  [fieldsUser.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsUser.EMAIL]: yup.string().email('Should be e-mail').required('E-mail is required'),
  [fieldsUser.PASSWORD]: yup.string(),
  [fieldsUser.ROLE]: yup
    .mixed<keyof typeof EnumRoleUser>()
    .oneOf(Object.values(EnumRoleUser))
    .required('Type user is required'),
});

export const defaultValuesUser = {
  [fieldsUser.NAME]: '',
  [fieldsUser.EMAIL]: '',
  [fieldsUser.PASSWORD]: '',
  [fieldsUser.ROLE]: EnumRoleUser.NORMAL,
};

export const defaultValuesUserEdit = (user: IUserDTO) => ({
  id: user.id,
  [fieldsUser.NAME]: user.name,
  [fieldsUser.EMAIL]: user.email,
  [fieldsUser.PASSWORD]: '',
  [fieldsUser.ROLE]: user.role,
});
