import * as yup from 'yup';

import Mask from '../constants/masks';

export interface IClientDTO {
  id?: number;
  name: string;
  phone?: string;
  debit: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormClient {
  id?: number;
  name: string;
  phone?: string;
  debit: string;
}

export const transformObject = (dataForm: IFormClient): IClientDTO => {
  const object: IClientDTO = {
    name: dataForm.name,
    debit: dataForm.debit.length === 0 ? 0 : Mask.convertCurrency(dataForm.debit),
  };
  if (dataForm.phone.length && dataForm.phone !== '(') {
    object.phone = dataForm.phone;
  }
  return object;
};

export const schemaCreateClient = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  debit: yup.string().optional(),
  phone: yup.string().optional(),
});
