import { IClientDTO, IFormClient } from 'shared/dtos';
import Mask from 'shared/utils/masks';

export const transformObject = (dataForm: IFormClient): IClientDTO => {
  const object: IClientDTO = {
    name: dataForm.name,
    debit: dataForm.debit.length === 0 ? 0 : Mask.convertCurrency(dataForm.debit),
  };
  if (dataForm?.phone?.length && dataForm.phone !== '(') {
    object.phone = dataForm.phone;
  }
  return object;
};
