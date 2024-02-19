import { IFormProduct, IProductDTO } from 'shared/dtos/IProductDTO';

export interface DialogEditProps {
  smDown?: boolean;
  product: IProductDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormProduct) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
