import { IFormFilterPurchasePage } from 'shared/dtos';

export interface FilterPurchaseProps {
  loadingPurchases: boolean;
  onSubmitFilter: (dataForm: IFormFilterPurchasePage) => Promise<void>;
}
