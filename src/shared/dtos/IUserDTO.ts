import * as yup from 'yup';

export enum EnumRoleUser {
  SUPER = 'SUPER',
  NORMAL = 'NORMAL',
  EMPLOYEE = 'EMPLOYEE',
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

export interface IFormUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: EnumRoleUser;
}

export const transformObjectUser = (dataForm: IFormUser): IUserDTO => {
  const object: IUserDTO = {
    name: dataForm.name,
    email: dataForm.email,
    password: dataForm.password,
    role: dataForm.role,
  };
  return object;
};

export const schemaCreateUser = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Should be e-mail').required('E-mail is required'),
  password: yup.string().required('Password is required'),
  role: yup
    .mixed<keyof typeof EnumRoleUser>()
    .oneOf(Object.values(EnumRoleUser))
    .required('Type user is required'),
});
