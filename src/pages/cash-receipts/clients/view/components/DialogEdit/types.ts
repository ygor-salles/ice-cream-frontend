import { IClientDTO, IFormClient } from 'shared/dtos/IClientDTO';

export interface DialogEditProps {
  client: IClientDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormClient) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
