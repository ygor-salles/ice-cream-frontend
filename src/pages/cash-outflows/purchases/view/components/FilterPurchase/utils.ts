import { IFormFilterPurchasePage } from 'shared/dtos/IPurchaseDTO';
import * as yup from 'yup';

export const fieldPurchaseFilter: IFormFilterPurchasePage = {
  provider_name: 'provider_name',
  provider_id: 'provider_id',
  observation: 'observation',
  start_date: 'start_date',
  end_date: 'end_date',
};

export const defaultValues = {
  [fieldPurchaseFilter.provider_name]: '',
  [fieldPurchaseFilter.provider_id]: '',
  [fieldPurchaseFilter.observation]: '',
  [fieldPurchaseFilter.start_date]: '',
  [fieldPurchaseFilter.end_date]: '',
};

export const schemaFilterPurchse = {
  [fieldPurchaseFilter.provider_name]: yup.string().optional(),
  [fieldPurchaseFilter.observation]: yup.string().optional(),
  [fieldPurchaseFilter.start_date]: yup.string().optional(),
  [fieldPurchaseFilter.end_date]: yup.string().optional(),
};
