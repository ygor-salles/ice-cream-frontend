import * as yup from 'yup';

import Mask from '../constants/masks';
import { convertProductsType } from '../utils/convertTypes';

export enum EnumTypeProduct {
  ICE_CREAM = 'SORVETE',
  ACAI = 'ACAI',
  POPSICLE = 'PICOLE',
  GELADINHO = 'GELADINHO',
  SALTY = 'SALGADO',
  GENERAL = 'GERAL',
}

export interface IProductDTO {
  id?: number;
  name: string;
  price: number;
  description?: string;
  type: EnumTypeProduct;
  status?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormProduct {
  id?: number;
  name: string;
  price: string;
  description: string;
  type: string;
}

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

export const schemaCreateProduct = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  price: yup.string().required('Preço é obrigatório'),
  description: yup.string().optional(),
  type: yup
    .mixed<EnumTypeProduct>()
    .oneOf(Object.values(EnumTypeProduct))
    .required('Tipo de produto é obrigatório'),
});
