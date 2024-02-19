import { IFormFilterSalePage } from 'shared/dtos/ISaleDTO';

export interface FilterSaleProps {
  loadingSales: boolean;
  onSubmitFilter: (dataForm: IFormFilterSalePage) => Promise<void>;
}
