import { IFormProvider, IProviderDTO } from 'shared/dtos/IProviderDTO';

export interface DialogEditProps {
  smDown?: boolean;
  provider: IProviderDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormProvider) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
