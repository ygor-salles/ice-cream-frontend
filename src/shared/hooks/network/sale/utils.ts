import { IFormCashClosing, IFormEditSale } from 'shared/dtos';
import { ICreateCashClosingDTORequest } from 'shared/services/SaleService/dtos/ICreateCashClosingDTO';
import { ILoadPagedSalesDTORequest } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { IUpdateSaleDTORequest } from 'shared/services/SaleService/dtos/IUpdateSaleDTO';
import { getLocalDate } from 'shared/utils';
import Mask from 'shared/utils/masks';

export const transformObjectCashClosing = (
  dataForm: IFormCashClosing,
): ICreateCashClosingDTORequest => {
  const objectSale: ICreateCashClosingDTORequest = {
    total: Mask.convertCurrency(dataForm.total),
    created_at:
      dataForm.created_at && dataForm?.created_at?.length > 0
        ? getLocalDate(dataForm.created_at)
        : getLocalDate(),
  };

  return objectSale;
};

export const transformObjectEdit = (dataForm: IFormEditSale) => {
  const objectEditSale: IUpdateSaleDTORequest = {
    id: dataForm.id,
    type_sale: dataForm.type_sale,
    data_product: dataForm.data_product,
    total: dataForm.total,
    observation: dataForm.observation?.length ? dataForm.observation : undefined,
    in_progress: dataForm.in_progress,
  };

  if (dataForm.client_id) {
    objectEditSale.client_id = dataForm.client_id;
  }

  return objectEditSale;
};

export const transformObjectFilterSale = (dataForm: ILoadPagedSalesDTORequest) => {
  const { limit, page, client_id, end_date, observation, start_date } = dataForm;

  const obj: ILoadPagedSalesDTORequest = { limit, page };

  const clientOk = client_id && client_id !== 'null' && client_id.length > 0;
  const observationOk = observation && observation !== 'null' && observation.length > 0;
  const startDateOk = start_date && start_date !== 'null' && start_date.length > 0;
  const endDateOk = end_date && end_date !== 'null' && end_date.length > 0;

  if (clientOk) {
    obj.client_id = client_id;
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
