import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';

export const getTitle = (data_product: IDataProduct[]): string => {
  if (data_product?.length > 1) return `${data_product[0].amount} ${data_product[0].name}, [...]`;

  if (data_product?.length === 1) return `${data_product[0].amount} ${data_product[0].name}`;

  return '';
};
