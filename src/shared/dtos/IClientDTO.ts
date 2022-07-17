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

export const transformObjectClient = (dataForm: IFormClient): IClientDTO => {
  const object: IClientDTO = {
    name: dataForm.name,
    debit: Mask.convertCurrency(dataForm.debit),
  };
  if (dataForm.phone.length) {
    object.phone = dataForm.phone;
  }
  return object;
};

export const schemaCreateClient = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  debit: yup.string().required('Preço é obrigatório'),
  phone: yup.string().optional(),
});
