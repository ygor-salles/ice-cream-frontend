import { IFormProvider, IProviderDTO } from 'shared/dtos';
import * as yup from 'yup';

export const fieldsProvider = {
  NAME: 'name',
  PHONE: 'phone',
  ITS_ICE_CREAM_SHOP: 'its_ice_cream_shoop',
};

export const schemaProvider = yup.object().shape({
  [fieldsProvider.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsProvider.PHONE]: yup.string().optional(),
  [fieldsProvider.ITS_ICE_CREAM_SHOP]: yup.boolean().required('Marcação é obrigatório'),
});

export const defaultValuesProvider: IFormProvider = {
  name: '',
  phone: '',
  its_ice_cream_shoop: true,
};

export const defaultValuesProviderEdit = (provider: IProviderDTO): IFormProvider => ({
  ...provider,
  phone: provider.phone ?? '',
});
