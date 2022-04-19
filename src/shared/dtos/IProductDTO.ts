import * as yup from 'yup';

import Mask from '../constants/masks';

export interface IProductDTO {
  id?: number;
  name: string;
  price: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IFormProduct {
  name: string;
  price: string;
  description: string;
}

export const transformObject = (dataForm: IFormProduct): IProductDTO => {
  const object: IProductDTO = {
    name: dataForm.name,
    price: Mask.convertCurrency(dataForm.price),
  };
  if (dataForm.description.length) {
    object.description = dataForm.description;
  }
  return object;
};

export const schemaCreateProduct = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  price: yup.string().required('Preço é obrigatório'),
  description: yup.string().optional(),
});
