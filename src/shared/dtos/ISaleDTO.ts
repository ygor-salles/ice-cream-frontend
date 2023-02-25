import { ICreateCashClosingDTORequest } from 'shared/services/SaleService/dtos/ICreateCashClosingDTO';
import { ILoadSumSalesDTORequest } from 'shared/services/SaleService/dtos/ILoadSumSalesDTO';
import { convetSalesType } from 'shared/utils/convertTypes';
import Mask from 'shared/utils/masks';
import * as yup from 'yup';

import { IClientDTO } from './IClientDTO';
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
  client?: IClientDTO;
  inProgress?: boolean;
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

export interface IFormCashClosing {
  total: string;
  created_at?: string;
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
  CREATED_AT: 'created_at',
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

export const defaultValuesCashClosing = {
  [fieldsSale.TOTAL]: '',
  [fieldsSale.CREATED_AT]: '',
};

export const schemaCreateCashClosing = yup.object().shape({
  [fieldsSale.TOTAL]: yup.string().required('Total de venda é obrigatório'),
  [fieldsSale.CREATED_AT]: yup.string().optional(),
});

export const transformObjectCashClosing = (
  dataForm: IFormCashClosing,
): ICreateCashClosingDTORequest => {
  const objectSale: ICreateCashClosingDTORequest = {
    total: Mask.convertCurrency(dataForm.total),
  };
  if (dataForm.created_at) {
    const date = new Date(dataForm.created_at);
    date.setHours(12, 0, 0, 0);
    objectSale.created_at = date;
  }

  return objectSale;
};

// ------------

export interface IFormFilterSales {
  startDate: string;
  endDate: string;
  type_sale?: EnumTypeSale;
}

export const fieldsFilterSale = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  TYPE_SALE: 'type_sale',
};

export const defaultValuesFilterSale = {
  [fieldsFilterSale.START_DATE]: '',
  [fieldsFilterSale.END_DATE]: '',
  [fieldsFilterSale.TYPE_SALE]: '',
};

export const schemaFilterSale = yup.object().shape({
  [fieldsFilterSale.START_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterSale.END_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterSale.TYPE_SALE]: yup.string(),
});

export const transformObjectFilter = (dataForm: IFormFilterSales): ILoadSumSalesDTORequest => {
  const object: ILoadSumSalesDTORequest = { ...dataForm };
  if (!dataForm.type_sale.length) {
    delete object.type_sale;
  }
  return object;
};
