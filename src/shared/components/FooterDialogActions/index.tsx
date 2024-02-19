import { Button, CircularProgress } from '@mui/material';

import { ButtonSubmitApp } from '../ButtonSubmitApp';
import { StyledButton, StyledDialogActions } from './styles';
import { FooterDialogActionsProps } from './types';

export const FooterDialogActions = ({
  textButtonCancel,
  textButtonConfirm,
  onClose,
  loading,
  isDialogDelete,
  onSubmitDelete,
  id,
}: FooterDialogActionsProps) =>
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
