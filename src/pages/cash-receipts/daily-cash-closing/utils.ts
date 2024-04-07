import * as yup from 'yup';

import { fieldsSale } from '../sales/utils';

export const defaultValuesCashClosing = {
  [fieldsSale.TOTAL]: '',
  [fieldsSale.CREATED_AT]: '',
};

export const schemaCreateCashClosing = yup.object().shape({
  [fieldsSale.TOTAL]: yup.string().required('Total de venda é obrigatório'),
  [fieldsSale.CREATED_AT]: yup.string().optional(),
});
