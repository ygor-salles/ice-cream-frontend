import { ILoadPagedPurchasesDTORequest } from 'shared/services/PurchaseService/dtos/ILoadPagedPurchasesDTO';
import { ILoadSumPurchaseDTORequest } from 'shared/services/PurchaseService/dtos/ILoadSumPurchaseDTO';
import formatNumberToCurrencyInput from 'shared/utils/formaNumberToCurrencyInput';
import { getLocalDate } from 'shared/utils/getLocalDate';
import Mask from 'shared/utils/masks';
import * as yup from 'yup';

import { EnumTypeProvider, IProviderDTO } from './IProviderDTO';

export interface IPurchaseDTO {
  id?: number;
  value_total: number;
  observation?: string;
  its_ice_cream_shoop: boolean;
  file?: File;
  nf_url?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  provider_id: number;
  provider?: IProviderDTO;
}

export interface IFormPurchase {
  id: number;
  value_total: string;
  observation?: string;
  provider_id: string;
  its_ice_cream_shoop: boolean;
  created_at: string;
  file?: File;
  nf_url?: string;
}

export interface IFormFilterPurchasePage {
  provider_name: string;
  provider_id: string;
  observation: string;
  start_date: string;
  end_date: string;
}

export const fieldsPurchase = {
  VALUE_TOTAL: 'value_total',
  OBSERVATION: 'observation',
  ITS_ICE_CREAM_SHOP: 'its_ice_cream_shoop',
  FILE: 'file',
  PROVIDER_ID: 'provider_id',
  CREATED_AT: 'created_at',
  NF_URL: 'nf_url',
};

export const defaultValuesPurchase = {
  [fieldsPurchase.VALUE_TOTAL]: '',
  [fieldsPurchase.OBSERVATION]: '',
  [fieldsPurchase.ITS_ICE_CREAM_SHOP]: true,
  [fieldsPurchase.FILE]: null,
  [fieldsPurchase.PROVIDER_ID]: '',
  [fieldsPurchase.CREATED_AT]: '',
};

export const defaultValuesPurchaseEdit = (purchase: IPurchaseDTO) => ({
  id: purchase.id,
  [fieldsPurchase.VALUE_TOTAL]: formatNumberToCurrencyInput(purchase.value_total),
  [fieldsPurchase.OBSERVATION]: purchase.observation,
  [fieldsPurchase.ITS_ICE_CREAM_SHOP]: purchase.its_ice_cream_shoop,
  [fieldsPurchase.NF_URL]: purchase.nf_url,
  [fieldsPurchase.PROVIDER_ID]: purchase.provider_id.toString(),
  [fieldsPurchase.CREATED_AT]: purchase.created_at,
});

export const schemaCreatePurchase = yup.object().shape({
  [fieldsPurchase.VALUE_TOTAL]: yup.string().required('Valor total é obrigatório'),
  [fieldsPurchase.OBSERVATION]: yup.string().optional().nullable(),
  [fieldsPurchase.ITS_ICE_CREAM_SHOP]: yup.boolean().required('Marcação é obrigatório'),
  [fieldsPurchase.PROVIDER_ID]: yup.string().required('A seleção de fornecedor é obrigatória'),
  [fieldsPurchase.CREATED_AT]: yup.string().optional(),
  [fieldsPurchase.FILE]: yup
    .mixed()
    .test('type', 'Formato inválido', (value: File) => {
      if (value) {
        return (
          value.type === 'image/png' ||
          value.type === 'image/jpg' ||
          value.type === 'image/jpeg' ||
          value.type === 'image/pjpeg' ||
          value.type === 'image/gif' ||
          value.type === 'image/svg+xml'
        );
      }
      return true;
    })
    .notRequired(),
});

export const transformObject = (dataForm: IFormPurchase): IPurchaseDTO => {
  const object: IPurchaseDTO = {
    ...dataForm,
    created_at:
      dataForm?.created_at?.length > 0 ? getLocalDate(dataForm.created_at) : getLocalDate(),
    value_total: Mask.convertCurrency(dataForm.value_total),
    provider_id: Number(dataForm.provider_id),
  };
  if (!dataForm.observation || dataForm.observation?.length === 0) {
    delete object.observation;
  }
  if (!dataForm.file) {
    delete object.file;
  }
  return object;
};

// ------
export interface IFormFilterPurchase {
  startDate: string;
  endDate: string;
  its_ice_cream_shoop?: string;
  provider_id?: string;
}

export const fieldsFilterPurchase = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  ITS_ICE_CREAM_SHOOP: 'its_ice_cream_shoop',
  PROVIDER_ID: 'provider_id',
};

export const defaultValuesFilterPurchase: IFormFilterPurchase = {
  startDate: '',
  endDate: '',
  its_ice_cream_shoop: '',
  provider_id: '',
};

export const schemaFilterPurchase = yup.object().shape({
  [fieldsFilterPurchase.START_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterPurchase.END_DATE]: yup.string().required('obrigatório'),
  [fieldsFilterPurchase.ITS_ICE_CREAM_SHOOP]: yup.string().optional(),
  [fieldsFilterPurchase.PROVIDER_ID]: yup.string().optional(),
});

export const transformObjectFilter = (
  dataForm: IFormFilterPurchase,
): ILoadSumPurchaseDTORequest => {
  const object: ILoadSumPurchaseDTORequest = {
    startDate: dataForm.startDate,
    endDate: dataForm.endDate,
  };
  if (dataForm.its_ice_cream_shoop) {
    object.its_ice_cream_shoop =
      dataForm.its_ice_cream_shoop === EnumTypeProvider.PROVIDER ||
      dataForm.its_ice_cream_shoop === EnumTypeProvider.EMPLOYEE;
  }
  if (dataForm.provider_id?.length) {
    object.provider_id = Number(dataForm.provider_id);
  }
  return object;
};

export const transformObjectFilterPurchase = (dataForm: ILoadPagedPurchasesDTORequest) => {
  const { limit, page, provider_id, end_date, observation, start_date } = dataForm;

  const obj: ILoadPagedPurchasesDTORequest = { limit, page };

  const clientOk = provider_id && provider_id !== 'null' && provider_id.length > 0;
  const observationOk = observation && observation !== 'null' && observation.length > 0;
  const startDateOk = start_date && start_date !== 'null' && start_date.length > 0;
  const endDateOk = end_date && end_date !== 'null' && end_date.length > 0;

  if (clientOk) {
    obj.provider_id = provider_id;
  }
  if (observationOk) {
    obj.observation = observation;
  }
  if (startDateOk && endDateOk) {
    obj.start_date = start_date;
    obj.end_date = end_date;
  }

  return obj;
};
