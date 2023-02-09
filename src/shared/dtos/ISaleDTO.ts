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

export const fieldsSale = {
  PRODUCT_ID: 'product_id',
  DATA_PRODUCT: 'data_product',
  COMBINATIONS: 'combinations',
  TYPE_SALE: 'type_sale',
  CLIENT_ID: 'client_id',
  OBSERVATION: 'observation',
  AMOUNT: 'amount',
  TOTAL: 'total',
};

export const defaultValueAmount = '1';
export const defaultValuesSale = {
  [fieldsSale.PRODUCT_ID]: '',
  [fieldsSale.DATA_PRODUCT]: null,
  [fieldsSale.COMBINATIONS]: [],
  [fieldsSale.TYPE_SALE]: '',
  [fieldsSale.CLIENT_ID]: '',
  [fieldsSale.OBSERVATION]: '',
  [fieldsSale.AMOUNT]: defaultValueAmount,
  [fieldsSale.TOTAL]: '',
};

export const schemaCreateSale = yup.object().shape({
  [fieldsSale.PRODUCT_ID]: yup.string().required('Seleção de produto é obrigatório'),
  [fieldsSale.TYPE_SALE]: yup
    .mixed<EnumTypeSale>()
    .oneOf(Object.values(EnumTypeSale))
    .required('Tipo de venda é obrigatório'),
  [fieldsSale.CLIENT_ID]: yup.string(),
  [fieldsSale.OBSERVATION]: yup.string().optional(),
  [fieldsSale.AMOUNT]: yup.string().required('Quantidade de produto é obrigatório'),
  [fieldsSale.TOTAL]: yup.string().required('Total da venda é obrigatório'),
});

export const schemaCreateSaleWithCustomer = yup.object().shape({
  [fieldsSale.PRODUCT_ID]: yup.string().required('Seleção de produto é obrigatório'),
  [fieldsSale.TYPE_SALE]: yup
    .mixed<EnumTypeSale>()
    .oneOf(Object.values(EnumTypeSale))
    .required('Tipo de venda é obrigatório'),
  [fieldsSale.CLIENT_ID]: yup.string().required('Cliente é obrigatório para venda fiado'),
  [fieldsSale.OBSERVATION]: yup.string().optional(),
  [fieldsSale.AMOUNT]: yup.string().required('Quantidade de produto é obrigatório'),
  [fieldsSale.TOTAL]: yup.string().required('Total da venda é obrigatório'),
});

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
