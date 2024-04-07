import { IFormFilterPurchase } from 'shared/dtos';
import * as yup from 'yup';

export const fieldsFilterPurchase = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  ITS_ICE_CREAM_SHOOP: 'its_ice_cream_shoop',
  PROVIDER_ID: 'provider_id',
};

export const schemaFilterPurchase = yup.object().shape({
  [fieldsFilterPurchase.START_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterPurchase.END_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterPurchase.ITS_ICE_CREAM_SHOOP]: yup.string().optional(),
  [fieldsFilterPurchase.PROVIDER_ID]: yup.string().optional(),
});

export const defaultValuesFilterPurchase: IFormFilterPurchase = {
  startDate: '',
  endDate: '',
  its_ice_cream_shoop: '',
  provider_id: '',
};

// -----

export const fieldsFilterSale = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  TYPE_SALE: 'type_sale',
};

export const defaultValuesFilterSale = {
  [fieldsFilterSale.START_DATE]: '',
  [fieldsFilterSale.END_DATE]: '',
  [fieldsFilterSale.TYPE_SALE]: '',
};

export const schemaFilterSale = yup.object().shape({
  [fieldsFilterSale.START_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterSale.END_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterSale.TYPE_SALE]: yup.string(),
});
