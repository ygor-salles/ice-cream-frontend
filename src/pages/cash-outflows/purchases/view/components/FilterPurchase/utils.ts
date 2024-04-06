import { IFormFilterPurchasePage } from 'shared/dtos/IPurchaseDTO';
import * as yup from 'yup';

export const fieldPurchaseFilter: IFormFilterPurchasePage = {
  provider_name: 'provider_name',
  provider_id: 'provider_id',
  observation: 'observation',
  start_date: 'start_date',
  end_date: 'end_date',
};

export const defaultValues: Record<keyof IFormFilterPurchasePage, string> = {
  provider_name: '',
  provider_id: '',
  observation: '',
  start_date: '',
  end_date: '',
};

export const schemaFilterPurchse: Record<keyof IFormFilterPurchasePage, yup.AnySchema> = {
  provider_id: yup.string().optional(),
  provider_name: yup.string().optional(),
  observation: yup.string().optional(),
  start_date: yup.string().optional(),
  end_date: yup.string().optional(),
};
