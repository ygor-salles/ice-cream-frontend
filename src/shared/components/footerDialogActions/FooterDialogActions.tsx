import { Button, CircularProgress } from '@mui/material';

import ButtonSubmitApp from '../button/ButtonSubmitApp';
import { StyledButton, StyledDialogActions } from './styles';

interface FooterDialogActionsProps {
  textButtonCancel: string;
  textButtonConfirm: string;
  onClose: () => void;
  loading: boolean;
  isDialogDelete?: boolean;
  onSubmitDelete?: (id: number) => void;
  id?: number;
}

const FooterDialogActions: React.FC<FooterDialogActionsProps> = ({
  textButtonCancel,
  textButtonConfirm,
  onClose,
  loading,
  isDialogDelete,
  onSubmitDelete,
  id,
}) =>
  isDialogDelete ? (
    <StyledDialogActions>
      <StyledButton autoFocus variant="outlined" onClick={onClose} disabled={loading}>
        {textButtonCancel}
      </StyledButton>
      <Button
        variant="contained"
        onClick={() => onSubmitDelete(id)}
        endIcon={loading && <CircularProgress variant="indeterminate" color="inherit" size={20} />}
        disabled={loading}
      >
        {textButtonConfirm}
      </Button>
    </StyledDialogActions>
  ) : (
    <StyledDialogActions>
      <StyledButton variant="outlined" type="button" onClick={onClose} disabled={loading}>
        {textButtonCancel}
      </StyledButton>
      <ButtonSubmitApp loading={loading} textButton={textButtonConfirm} />
    </StyledDialogActions>
  );

export default FooterDialogActions;
