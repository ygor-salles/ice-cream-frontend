import * as yup from 'yup';

import Mask from '../constants/masks';
import { convetSalesType } from '../utils/convertTypes';

export enum EnumTypeSale {
  PIX = 'PIX',
  CARD = 'CARTAO',
  MONEY = 'DINHEIRO',
  DEBIT = 'FIADO',
}

export interface ISaleDTO {
  id?: number;
  product_id: number;
  type_sale: EnumTypeSale;
  client_id?: number;
  observation?: string;
  total: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormSale {
  product_id: string;
  type_sale: string;
  client_id?: string;
  observation?: string;
  total: string;
}

export const transformObjectSale = (dataForm: IFormSale): ISaleDTO => {
  const objectSale: ISaleDTO = {
    product_id: Number(dataForm.product_id),
    total: Mask.convertCurrency(dataForm.total),
    type_sale: convetSalesType(dataForm.type_sale),
  };

  if (dataForm.observation.length) {
    objectSale.observation = dataForm.observation;
  }
  if (dataForm.client_id.length) {
    objectSale.client_id = Number(dataForm.client_id);
  }

  return objectSale;
};

export const schemaCreateSale = yup.object().shape({
  product_id: yup.string().required('Seleção de produto é obrigatório'),
  type_sale: yup
    .mixed<EnumTypeSale>()
    .oneOf(Object.values(EnumTypeSale))
    .required('Tipo de venda é obrigatório'),
  client_id: yup.string(),
  observation: yup.string().optional(),
  total: yup.string().required('Total da venda é obrigatório'),
});

export const schemaCreateSaleWithCustomer = yup.object().shape({
  product_id: yup.string().required('Seleção de produto é obrigatório'),
  type_sale: yup
    .mixed<EnumTypeSale>()
    .oneOf(Object.values(EnumTypeSale))
    .required('Tipo de venda é obrigatório'),
  client_id: yup.string().required('Cliente é obrigatório para venda fiado'),
  observation: yup.string().optional(),
  total: yup.string().required('Total da venda é obrigatório'),
});
