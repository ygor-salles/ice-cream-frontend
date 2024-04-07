import { EnumTypeProvider, IFormFilterPurchase, IFormPurchase, IPurchaseDTO } from 'shared/dtos';
import { ILoadPagedPurchasesDTORequest } from 'shared/services/PurchaseService/dtos/ILoadPagedPurchasesDTO';
import { ILoadSumPurchaseDTORequest } from 'shared/services/PurchaseService/dtos/ILoadSumPurchaseDTO';
import { getLocalDate } from 'shared/utils';
import Mask from 'shared/utils/masks';

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
