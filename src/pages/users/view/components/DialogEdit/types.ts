import { IFormUser, IUserDTO } from 'shared/dtos';

export interface DialogEditProps {
  smDown?: boolean;
  user: IUserDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormUser) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
