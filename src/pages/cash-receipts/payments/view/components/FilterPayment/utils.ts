import { IFormFilterPaymentPage } from 'shared/dtos/IPaymentDTO';
import * as yup from 'yup';

export const fieldPaymentFilter: IFormFilterPaymentPage = {
  client_name: 'client_name',
  client_id: 'client_id',
  observation: 'observation',
  start_date: 'start_date',
  end_date: 'end_date',
};

export const defaultValues = {
  [fieldPaymentFilter.client_name]: '',
  [fieldPaymentFilter.client_id]: '',
  [fieldPaymentFilter.observation]: '',
  [fieldPaymentFilter.start_date]: '',
  [fieldPaymentFilter.end_date]: '',
};

export const schemaFilterPayment = {
  [fieldPaymentFilter.client_name]: yup.string().optional(),
  [fieldPaymentFilter.observation]: yup.string().optional(),
  [fieldPaymentFilter.start_date]: yup.string().optional(),
  [fieldPaymentFilter.end_date]: yup.string().optional(),
};
