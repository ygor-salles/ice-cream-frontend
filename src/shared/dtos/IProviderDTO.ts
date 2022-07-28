import * as yup from 'yup';

export interface IProviderDTO {
  id?: number;
  name: string;
  phone?: string;
  its_ice_cream_shoop: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormProvider {
  id?: number;
  name: string;
  phone: string;
  its_ice_cream_shoop: boolean;
}

export const transformObject = (dataForm: IFormProvider): IProviderDTO => {
  const object: IProviderDTO = {
    name: dataForm.name,
    its_ice_cream_shoop: dataForm.its_ice_cream_shoop,
  };
  if (dataForm.phone.length) {
    object.phone = dataForm.phone;
  }
  return object;
};

export const schemaCreateProvider = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  phone: yup.string().optional(),
  its_ice_cream_shoop: yup.boolean().required('Marcação é obrigatório'),
});
