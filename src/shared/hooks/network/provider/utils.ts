import { IFormProvider, IProviderDTO } from 'shared/dtos';

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
