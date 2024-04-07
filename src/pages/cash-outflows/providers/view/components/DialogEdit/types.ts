import { IFormProvider, IProviderDTO } from 'shared/dtos';

export interface DialogEditProps {
  smDown?: boolean;
  provider: IProviderDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormProvider) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
