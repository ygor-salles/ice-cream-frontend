import { IFormFilterSalePage } from 'shared/dtos';

export interface FilterSaleProps {
  loadingSales: boolean;
  onSubmitFilter: (dataForm: IFormFilterSalePage) => Promise<void>;
}
