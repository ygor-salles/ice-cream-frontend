import { Button, CircularProgress } from '@mui/material';

import { StyledButton, StyledDialogActions } from './styles';
import { FooterDialogActionsProps } from './types';

export const FooterDialogActions = ({
  textButtonCancel,
  textButtonConfirm,
  onClose,
  loading,
  disabled,
  isDialogDelete,
  onSubmitDelete,
  id,
}: FooterDialogActionsProps) => {
  if (isDialogDelete) {
    const idFunc = id ?? 0;

    return (
      <StyledDialogActions>
        <StyledButton autoFocus variant="outlined" onClick={onClose} disabled={loading}>
          {textButtonCancel}
        </StyledButton>
        <Button
          variant="contained"
          onClick={onSubmitDelete ? () => onSubmitDelete(idFunc) : undefined}
          endIcon={
            loading && <CircularProgress variant="indeterminate" color="inherit" size={20} />
          }
          disabled={loading || disabled}
        >
          {textButtonConfirm}
        </Button>
      </StyledDialogActions>
    );
  }

  return (
    <StyledDialogActions>
      <StyledButton variant="outlined" type="button" onClick={onClose} disabled={loading}>
        {textButtonCancel}
      </StyledButton>
      <Button
        type="submit"
        variant="contained"
        endIcon={loading && <CircularProgress variant="indeterminate" color="inherit" size={20} />}
        disabled={loading || disabled}
      >
        {textButtonConfirm}
      </Button>
    </StyledDialogActions>
  );
};
