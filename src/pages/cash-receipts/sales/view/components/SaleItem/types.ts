import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';

export interface SaleItemProps {
  onClick: () => void;
  detailSale: InstanceSale;
}
