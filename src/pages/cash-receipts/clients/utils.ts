import { IClientDTO } from 'shared/dtos';
import * as yup from 'yup';

export const fieldsClient = {
  NAME: 'name',
  PHONE: 'phone',
  DEBIT: 'debit',
};

export const schemaClient = yup.object().shape({
  [fieldsClient.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsClient.DEBIT]: yup.string().optional(),
  [fieldsClient.PHONE]: yup.string().optional(),
});

export const defaultValuesClient = {
  [fieldsClient.NAME]: '',
  [fieldsClient.PHONE]: '',
  [fieldsClient.DEBIT]: '',
};

export const defaultValuesClientEdit = (client: IClientDTO) => ({
  id: client.id,
  [fieldsClient.NAME]: client.name,
  [fieldsClient.DEBIT]: client.debit.toFixed(2).replace('.', ''),
  [fieldsClient.PHONE]: client.phone,
});
