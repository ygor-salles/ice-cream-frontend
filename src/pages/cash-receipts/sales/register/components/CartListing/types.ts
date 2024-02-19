import { Control } from 'react-hook-form';
import { EnumTypeSale, IFormEditSale } from 'shared/dtos/ISaleDTO';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';

export interface CartListingProps {
  listSale: IDataProduct[];
  observation?: string;
  type_sale?: EnumTypeSale;
  totalSum: number;
  textPrimary: string;
  textSecondary: string;
  disabledSecondary?: boolean;
  disabledActions?: boolean;
  renderMain?: React.ReactElement;
  loading?: boolean;
  control?: Control<IFormEditSale>;
  renderTopButtons?: React.ReactElement;
  renderBottomButtons?: React.ReactElement;
  hasClient?: boolean;
  onAddList?: () => void;
  onDeleteList: (object: IDataProduct) => void;
  onClickPrimary: () => void;
  onClickSeconadary: () => void;
}
