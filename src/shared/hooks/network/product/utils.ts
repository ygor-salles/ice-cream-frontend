import { IFormProduct, IProductDTO } from 'shared/dtos';
import { convertProductsType } from 'shared/utils/convertTypes';
import Mask from 'shared/utils/masks';

export const transformObject = (dataForm: IFormProduct): IProductDTO => {
  const object: IProductDTO = {
    name: dataForm.name,
    price: Mask.convertCurrency(dataForm.price),
    type: convertProductsType(dataForm.type),
  };
  if (dataForm.description.length) {
    object.description = dataForm.description;
  }
  return object;
};
