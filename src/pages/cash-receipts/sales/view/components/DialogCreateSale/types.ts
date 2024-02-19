import { IFormSale } from 'shared/dtos/ISaleDTO';

export interface DialogCreateSaleProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IFormSale) => void;
}
