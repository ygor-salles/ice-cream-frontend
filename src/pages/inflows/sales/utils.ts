import { EnumTypeProduct, EnumTypeSale, IFormSale, ISaleDTO } from 'shared/dtos';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import { convetSalesType } from 'shared/utils/convertTypes';
import Mask from 'shared/utils/masks';
import * as yup from 'yup';

interface IFormSaleSubmit {
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  client_id?: string;
  data_product: IDataProduct[];
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
  IN_PROGRESS: 'in_progress',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
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
  [fieldsSale.OBSERVATION]: yup.string().optional().nullable(),
  [fieldsSale.DATA_PRODUCT]: yup.array().min(1, 'Deve conter no mínimo um produto'),
});

export const defaultValueAmount = '1';
export const defaultDataProduct = { name: '', price: 0, type: EnumTypeProduct.GENERAL };
export const defaultValuesSale: IFormSale = {
  product_name: '',
  data_product: defaultDataProduct,
  combinations: [],
  type_sale: EnumTypeSale.MONEY,
  client_name: '',
  client_id: '',
  observation: '',
  amount: defaultValueAmount,
  total: '',
};

export const defaultValuesDialogSale = {
  [fieldsSale.PRODUCT_NAME]: '',
  [fieldsSale.DATA_PRODUCT]: null,
  [fieldsSale.COMBINATIONS]: [],
  [fieldsSale.AMOUNT]: defaultValueAmount,
  [fieldsSale.TOTAL]: '',
};

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
