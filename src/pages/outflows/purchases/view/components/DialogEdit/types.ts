import { IFormPurchase, IPurchaseDTO } from 'shared/dtos';

export interface DialogEditProps {
  purchase: IPurchaseDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormPurchase) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
