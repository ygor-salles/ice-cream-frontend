import { IClientDTO, IFormClient } from 'shared/dtos';
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

export const defaultValuesClient: IFormClient = {
  name: '',
  phone: '',
  debit: '',
};

export const defaultValuesClientEdit = (client: IClientDTO): IFormClient => ({
  ...client,
  debit: client.debit.toFixed(2).replace('.', ''),
  phone: client.phone ?? '',
});
