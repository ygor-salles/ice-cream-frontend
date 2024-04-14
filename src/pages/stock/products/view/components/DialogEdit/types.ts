import { IFormProduct, IProductDTO } from 'shared/dtos';

export interface DialogEditProps {
  product: IProductDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormProduct) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
