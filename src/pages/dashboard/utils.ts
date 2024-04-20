import { IFormFilterDashboard } from 'shared/dtos';
import * as yup from 'yup';

export const fieldsFilterDash = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  ITS_ICE_CREAM_SHOOP: 'its_ice_cream_shoop',
  PROVIDER_ID: 'provider_id',
  TYPE_SALE: 'type_sale',
};

export const schemaFilterDash = yup.object().shape({
  [fieldsFilterDash.START_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterDash.END_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterDash.ITS_ICE_CREAM_SHOOP]: yup.string().optional(),
  [fieldsFilterDash.PROVIDER_ID]: yup.string().optional(),
  [fieldsFilterDash.TYPE_SALE]: yup.string().optional(),
});

export const defaultValuesFilterDash: IFormFilterDashboard = {
  startDate: '',
  endDate: '',
  its_ice_cream_shoop: '',
  provider_id: '',
  type_sale: '',
};
