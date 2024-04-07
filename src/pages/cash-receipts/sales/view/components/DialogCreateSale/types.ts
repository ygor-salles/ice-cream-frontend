import { IFormSale } from 'shared/dtos';

export interface DialogCreateSaleProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IFormSale) => void;
}
