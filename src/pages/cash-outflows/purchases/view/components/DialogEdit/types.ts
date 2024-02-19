import { IFormPurchase, IPurchaseDTO } from 'shared/dtos/IPurchaseDTO';

export interface DialogEditProps {
  smDown?: boolean;
  purchase: IPurchaseDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormPurchase) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
