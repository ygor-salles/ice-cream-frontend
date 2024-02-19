import { ISaleDTO } from 'shared/dtos/ISaleDTO';
import { IUpdateSaleDTORequest } from 'shared/services/SaleService/dtos/IUpdateSaleDTO';

export interface CollapseCombinationsProps {
  sale: ISaleDTO;
  onChangeUpdateSaleById: (data: IUpdateSaleDTORequest) => Promise<void>;
  onToggleRefreshPage: () => void;
}
