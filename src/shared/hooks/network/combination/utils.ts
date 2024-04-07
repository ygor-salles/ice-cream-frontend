import { ICombinationDTO, IFormCombination } from 'shared/dtos';
import Mask from 'shared/utils/masks';

export const transformObject = (dataForm: IFormCombination): ICombinationDTO => {
  const object: ICombinationDTO = {
    name: dataForm.name,
    price: Mask.convertCurrency(dataForm.price),
  };
  return object;
};
