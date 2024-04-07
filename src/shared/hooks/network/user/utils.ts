import { IFormUser, IUserDTO, IUserDTOEdit } from 'shared/dtos';

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
