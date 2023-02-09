import Mask from 'shared/constants/masks';
import * as yup from 'yup';

import { IClientDTO } from './IClientDTO';

export interface IPaymentDTO {
  id?: number;
  value: number;
  observation?: string;
  client_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;

  client?: IClientDTO;
}

export interface IFormPayment {
  id?: number;
  value: string;
  observation?: string;
  client_id: string;
}

export const fieldsPayment = {
  VALUE: 'value',
  OBSERVATION: 'observation',
  CLIENT_ID: 'client_id',
};

export const defaultValuesPayment = {
  [fieldsPayment.VALUE]: '',
  [fieldsPayment.CLIENT_ID]: '',
  [fieldsPayment.OBSERVATION]: '',
};

export const schemaCreatePayment = yup.object().shape({
  [fieldsPayment.VALUE]: yup.string().required('Valor é obrigatório'),
  [fieldsPayment.OBSERVATION]: yup.string().optional(),
  [fieldsPayment.CLIENT_ID]: yup.string().required('Nome é obrigatório'),
});

export const transformObject = (dataForm: IFormPayment): IPaymentDTO => {
  const object: IPaymentDTO = {
    value: Mask.convertCurrency(dataForm.value),
    client_id: Number(dataForm.client_id),
  };
  if (dataForm.observation.length) {
    object.observation = dataForm.observation;
  }
  return object;
};
