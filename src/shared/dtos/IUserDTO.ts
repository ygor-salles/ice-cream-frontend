import * as yup from 'yup';

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

export const fieldsUser = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  ROLE: 'role',
};

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

export const transformObject = (dataForm: IFormUser): IUserDTO => {
  const object: IUserDTO = {
    name: dataForm.name,
    email: dataForm.email,
    password: dataForm.password,
    role: dataForm.role,
  };

  return object;
};

export const transformObjectEdit = (dataForm: IFormUser): IUserDTOEdit => {
  const object: IUserDTOEdit = {
    name: dataForm.name,
    email: dataForm.email,
    role: dataForm.role,
  };

  if (dataForm.password.length) {
    object.password = dataForm.password;
  }

  return object;
};
