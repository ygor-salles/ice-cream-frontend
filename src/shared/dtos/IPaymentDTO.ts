import { ILoadPagedPaymentsDTORequest } from 'shared/services/PaymentService/dtos/ILoadPagedPaymentsDTO';
import Mask from 'shared/utils/masks';
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

export interface IFormFilterPaymentPage {
  client_name: string;
  client_id: string;
  observation: string;
  start_date: string;
  end_date: string;
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
  if (dataForm.observation?.length) {
    object.observation = dataForm.observation;
  }
  return object;
};

interface ILoadPagedPaymentsDTO {
  limit: number;
  page: number;
  client_id?: string;
  observation?: string;
  start_date?: string;
  end_date?: string;
}

export const transformObjectFilterPayment = (
  dataForm: ILoadPagedPaymentsDTORequest,
): ILoadPagedPaymentsDTO => {
  const { limit, page, client_id, end_date, observation, start_date } = dataForm;

  const obj: ILoadPagedPaymentsDTO = { limit, page };

  const clientOk = client_id && client_id !== 'null' && client_id.length > 0;
  const observationOk = observation && observation !== 'null' && observation.length > 0;
  const startDateOk = start_date && start_date !== 'null' && start_date.length > 0;
  const endDateOk = end_date && end_date !== 'null' && end_date.length > 0;

  if (clientOk) {
    obj.client_id = client_id;
  }
  if (observationOk) {
    obj.observation = observation;
  }
  if (startDateOk && endDateOk) {
    obj.start_date = start_date;
    obj.end_date = end_date;
  }

  return obj;
};
