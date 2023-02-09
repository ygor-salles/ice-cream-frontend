import { convertProductsType } from 'shared/utils/convertTypes';
import formatNumberToCurrencyInput from 'shared/utils/formaNumberToCurrencyInput';
import Mask from 'shared/utils/masks';
import * as yup from 'yup';

import { ICombinationDTO } from './ICombinationDTO';

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
  combinations?: ICombinationDTO[];
}

export interface IFormProduct {
  id?: number;
  name: string;
  price: string;
  description: string;
  type: string;
}

export const fieldsProduct = {
  NAME: '',
  PRICE: '',
  DESCRIPTION: '',
  TYPE: '',
};

export const defaultValuesProduct = {
  [fieldsProduct.NAME]: '',
  [fieldsProduct.PRICE]: '',
  [fieldsProduct.DESCRIPTION]: '',
  [fieldsProduct.TYPE]: '',
};

export const defaultValuesProductEdit = (product: IProductDTO) => ({
  id: product.id,
  [fieldsProduct.NAME]: product.name,
  [fieldsProduct.PRICE]: formatNumberToCurrencyInput(product.price),
  [fieldsProduct.DESCRIPTION]: product.description,
  [fieldsProduct.TYPE]: product.type,
});

export const schemaCreateProduct = yup.object().shape({
  [fieldsProduct.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsProduct.PRICE]: yup.string().required('Preço é obrigatório'),
  [fieldsProduct.DESCRIPTION]: yup.string().optional(),
  [fieldsProduct.TYPE]: yup
    .mixed<EnumTypeProduct>()
    .oneOf(Object.values(EnumTypeProduct))
    .required('Tipo de produto é obrigatório'),
});

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
