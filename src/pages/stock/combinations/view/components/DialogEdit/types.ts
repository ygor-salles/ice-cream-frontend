import { ICombinationDTO, IFormCombination } from 'shared/dtos';

export interface DialogEditProps {
  combination: ICombinationDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormCombination) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
