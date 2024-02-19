import { ICombinationDTO, IFormCombination } from 'shared/dtos/ICombinationDTO';

export interface DialogEditProps {
  smDown?: boolean;
  combination: ICombinationDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormCombination) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}
