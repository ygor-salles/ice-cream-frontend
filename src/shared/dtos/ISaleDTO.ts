import Mask from 'shared/constants/masks';
import { convetSalesType } from 'shared/utils/convertTypes';
import * as yup from 'yup';

import { ICombinationDTO } from './ICombinationDTO';
import { IProductDTO } from './IProductDTO';

export enum EnumTypeSale {
  PIX = 'PIX',
  CARD = 'CARTAO',
  MONEY = 'DINHEIRO',
  DEBIT = 'FIADO',
}

export interface ISaleDTO {
  id?: number;
  data_product: IProductDTO;
  type_sale: EnumTypeSale;
  client_id?: number;
  observation?: string;
  amount: number;
  total: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormSale {
  product_id: string;
  data_product: IProductDTO;
  combinations: ICombinationDTO[];
  type_sale: string;
  client_id?: string;
  observation?: string;
  amount?: string;
  total: string;
}

export const transformObject = (dataForm: IFormSale): ISaleDTO => {
  const objectSale: ISaleDTO = {
    data_product: dataForm.data_product,
    total: Mask.convertCurrency(dataForm.total),
    type_sale: convetSalesType(dataForm.type_sale),
    amount: Number(dataForm.amount),
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
  amount: yup.string().required('Quantidade de produto é obrigatório'),
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
  amount: yup.string().required('Quantidade de produto é obrigatório'),
  total: yup.string().required('Total da venda é obrigatório'),
});
