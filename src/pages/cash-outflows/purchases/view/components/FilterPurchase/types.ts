import { IFormFilterPurchasePage } from 'shared/dtos/IPurchaseDTO';

export interface FilterPurchaseProps {
  loadingPurchases: boolean;
  onSubmitFilter: (dataForm: IFormFilterPurchasePage) => Promise<void>;
}
