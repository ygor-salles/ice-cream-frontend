import Mask from 'shared/constants/masks';
import * as yup from 'yup';

export interface IClientDTO {
  id?: number;
  name: string;
  phone?: string;
  debit: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormClient {
  id?: number;
  name: string;
  phone?: string;
  debit: string;
}

export const fieldsClient = {
  NAME: 'name',
  PHONE: 'phone',
  DEBIT: 'debit',
};

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

export const schemaCreateClient = yup.object().shape({
  [fieldsClient.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsClient.DEBIT]: yup.string().optional(),
  [fieldsClient.PHONE]: yup.string().optional(),
});

export const transformObject = (dataForm: IFormClient): IClientDTO => {
  const object: IClientDTO = {
    name: dataForm.name,
    debit: dataForm.debit.length === 0 ? 0 : Mask.convertCurrency(dataForm.debit),
  };
  if (dataForm.phone.length && dataForm.phone !== '(') {
    object.phone = dataForm.phone;
  }
  return object;
};
