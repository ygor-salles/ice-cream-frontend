import * as yup from 'yup';

export interface IProviderDTO {
  id?: number;
  name: string;
  phone?: string;
  its_ice_cream_shoop: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export enum EnumTypeProvider {
  PROVIDER = 'Fornecedor da sorveteria',
  EMPLOYEE = 'Funcionário da sorveteria',
  OTHER = 'Outro(não relacionado a sorveteria)',
}

export interface IFormProvider {
  id?: number;
  name: string;
  phone: string;
  its_ice_cream_shoop: boolean;
}

export const fieldsProvider = {
  NAME: 'name',
  PHONE: 'phone',
  ITS_ICE_CREAM_SHOP: 'its_ice_cream_shoop',
};

export const defaultValuesProvider = {
  [fieldsProvider.NAME]: '',
  [fieldsProvider.PHONE]: '',
  [fieldsProvider.ITS_ICE_CREAM_SHOP]: false,
};

export const defaultValuesProviderEdit = (provider: IProviderDTO) => ({
  id: provider.id,
  [fieldsProvider.NAME]: provider.name,
  [fieldsProvider.PHONE]: provider.phone,
  [fieldsProvider.ITS_ICE_CREAM_SHOP]: provider.its_ice_cream_shoop,
});

export const schemaCreateProvider = yup.object().shape({
  [fieldsProvider.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsProvider.PHONE]: yup.string().optional(),
  [fieldsProvider.ITS_ICE_CREAM_SHOP]: yup.boolean().required('Marcação é obrigatório'),
});

export const transformObject = (dataForm: IFormProvider): IProviderDTO => {
  const object: IProviderDTO = {
    name: dataForm.name,
    its_ice_cream_shoop: dataForm.its_ice_cream_shoop,
  };
  if (dataForm?.phone?.length) {
    object.phone = dataForm.phone;
  }
  return object;
};
