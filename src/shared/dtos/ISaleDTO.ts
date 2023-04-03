import { ICreateCashClosingDTORequest } from 'shared/services/SaleService/dtos/ICreateCashClosingDTO';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import { ILoadSumSalesDTORequest } from 'shared/services/SaleService/dtos/ILoadSumSalesDTO';
import { convetSalesType } from 'shared/utils/convertTypes';
import { getLocalDate } from 'shared/utils/getLocalDate';
import Mask from 'shared/utils/masks';
import * as yup from 'yup';

import { IClientDTO } from './IClientDTO';
import { ICombinationDTO } from './ICombinationDTO';
import { EnumTypeProduct, IProductDTO } from './IProductDTO';

export enum EnumTypeSale {
  PIX = 'PIX',
  CARD = 'CARTAO',
  MONEY = 'DINHEIRO',
  DEBIT = 'FIADO',
}

export interface ISaleDTO {
  id?: number;
  data_product: IDataProduct[];
  type_sale: EnumTypeSale;
  client_id?: number;
  client?: IClientDTO;
  in_progress?: boolean;
  observation?: string;
  total: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormSale {
  product_name: string;
  data_product: IProductDTO;
  combinations: ICombinationDTO[];
  type_sale: EnumTypeSale;
  client_name?: string;
  client_id?: string;
  observation?: string;
  amount?: string;
  total: string;
}

interface IFormSaleSubmit {
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  client_id?: string;
  data_product: IDataProduct[];
}

export interface IFormCashClosing {
  total: string;
  created_at?: string;
}

export interface IFormEditSale {
  id: number;
  observation?: string;
  type_sale: EnumTypeSale;
  created_at?: string;
  updated_at?: string;
  data_product?: IDataProduct[];
  total?: number;
  client_id?: number;
  client?: IClientDTO;
}

export const fieldsSale = {
  PRODUCT_NAME: 'product_name',
  DATA_PRODUCT: 'data_product',
  COMBINATIONS: 'combinations',
  TYPE_SALE: 'type_sale',
  CLIENT_NAME: 'client_name',
  CLIENT_ID: 'client_id',
  OBSERVATION: 'observation',
  AMOUNT: 'amount',
  TOTAL: 'total',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export const defaultValueAmount = '1';
export const defaultValuesSale = {
  [fieldsSale.PRODUCT_NAME]: '',
  [fieldsSale.DATA_PRODUCT]: null,
  [fieldsSale.COMBINATIONS]: [],
  [fieldsSale.TYPE_SALE]: EnumTypeSale.MONEY,
  [fieldsSale.CLIENT_NAME]: '',
  [fieldsSale.CLIENT_ID]: '',
  [fieldsSale.OBSERVATION]: '',
  [fieldsSale.AMOUNT]: defaultValueAmount,
  [fieldsSale.TOTAL]: '',
};

export const defaultValuesDialogSale = {
  [fieldsSale.PRODUCT_NAME]: '',
  [fieldsSale.DATA_PRODUCT]: null,
  [fieldsSale.COMBINATIONS]: [],
  [fieldsSale.AMOUNT]: defaultValueAmount,
  [fieldsSale.TOTAL]: '',
};

export const schemaCreateSale = yup.object().shape({
  [fieldsSale.PRODUCT_NAME]: yup.string().required('Seleção de produto é obrigatório'),
  [fieldsSale.TYPE_SALE]: yup
    .mixed<EnumTypeSale>()
    .oneOf(Object.values(EnumTypeSale))
    .required('Tipo de venda é obrigatório'),
  [fieldsSale.CLIENT_NAME]: yup.string(),
  [fieldsSale.OBSERVATION]: yup.string().optional(),
  [fieldsSale.AMOUNT]: yup.string().required('Quantidade de produto é obrigatório'),
  [fieldsSale.TOTAL]: yup.string().required('Total da venda é obrigatório'),
});

export const schemaCreateSaleWithCustomer = yup.object().shape({
  [fieldsSale.PRODUCT_NAME]: yup.string().required('Seleção de produto é obrigatório'),
  [fieldsSale.TYPE_SALE]: yup
    .mixed<EnumTypeSale>()
    .oneOf(Object.values(EnumTypeSale))
    .required('Tipo de venda é obrigatório'),
  [fieldsSale.CLIENT_NAME]: yup.string().required('Cliente é obrigatório para venda fiado'),
  [fieldsSale.OBSERVATION]: yup.string().optional(),
  [fieldsSale.AMOUNT]: yup.string().required('Quantidade de produto é obrigatório'),
  [fieldsSale.TOTAL]: yup.string().required('Total da venda é obrigatório'),
});

export const schemaDialogCreateSale = yup.object().shape({
  [fieldsSale.PRODUCT_NAME]: yup.string().required('Seleção de produto é obrigatório'),
  [fieldsSale.AMOUNT]: yup.string().required('Quantidade de produto é obrigatório'),
  [fieldsSale.TOTAL]: yup.string().required('Total da venda é obrigatório'),
});

export const schemaEditSale = yup.object().shape({
  [fieldsSale.TYPE_SALE]: yup
    .mixed<EnumTypeSale>()
    .oneOf(Object.values(EnumTypeSale))
    .required('Tipo de venda é obrigatório'),
  [fieldsSale.OBSERVATION]: yup.string().optional(),
});

export const transformItemArray = (dataForm: IFormSale): IDataProduct => {
  const object: IDataProduct = {
    amount: Number(dataForm.amount),
    name: dataForm.product_name,
    price: dataForm.data_product.price,
    total: Mask.convertCurrency(dataForm.total),
    combinations: dataForm.combinations.map(item => ({ name: item.name, price: item.price })),
    type: dataForm.data_product.type,
  };
  return object;
};

export const transformObject = (dataForm: IFormSaleSubmit): ISaleDTO => {
  const foundAcai = dataForm.data_product.find(item => item.type === EnumTypeProduct.ACAI);

  const objectSale: ISaleDTO = {
    total: dataForm.total,
    type_sale: convetSalesType(dataForm.type_sale),
    in_progress: !!foundAcai,
    data_product: dataForm.data_product.map(item =>
      item?.combinations?.length
        ? {
            amount: item.amount,
            name: item.name,
            price: item.price,
            total: item.total,
            combinations: item.combinations,
            type: item.type,
          }
        : {
            amount: item.amount,
            name: item.name,
            price: item.price,
            total: item.total,
            type: item.type,
          },
    ),
  };

  if (dataForm.observation?.length) {
    objectSale.observation = dataForm.observation;
  }
  if (dataForm.client_id?.length) {
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
    created_at:
      dataForm?.created_at?.length > 0 ? getLocalDate(dataForm.created_at) : getLocalDate(),
  };

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
