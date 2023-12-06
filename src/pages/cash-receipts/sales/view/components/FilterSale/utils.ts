import { IFormFilterSalePage } from 'shared/dtos/ISaleDTO';
import * as yup from 'yup';

export const fieldSaleFilter: IFormFilterSalePage = {
  client_name: 'client_name',
  client_id: 'client_id',
  observation: 'observation',
  start_date: 'start_date',
  end_date: 'end_date',
};

export const defaultValues = {
  [fieldSaleFilter.client_name]: '',
  [fieldSaleFilter.client_id]: '',
  [fieldSaleFilter.observation]: '',
  [fieldSaleFilter.start_date]: '',
  [fieldSaleFilter.end_date]: '',
};

export const schemaFilterSale = {
  [fieldSaleFilter.client_name]: yup.string().optional(),
  [fieldSaleFilter.observation]: yup.string().optional(),
  [fieldSaleFilter.start_date]: yup.string().optional(),
  [fieldSaleFilter.end_date]: yup.string().optional(),
};
