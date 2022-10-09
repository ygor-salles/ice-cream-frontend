import { Button } from '@mui/material';

import { StyledButton, StyledDialogActions } from './styles';

interface FooterDialogActionsProps {
  textButtonCancel: string;
  textButtonConfirm: string;
  onClose: () => void;
  loading: boolean;
}

const FooterDialogActions: React.FC<FooterDialogActionsProps> = ({
  textButtonCancel,
  textButtonConfirm,
  onClose,
  loading,
}) => {
  return (
    <StyledDialogActions>
      <StyledButton variant="outlined" type="button" onClick={onClose} disabled={loading}>
        {textButtonCancel}
      </StyledButton>
      <Button variant="contained" type="submit" disabled={loading}>
        {textButtonConfirm}
      </Button>
    </StyledDialogActions>
  );
};

export default FooterDialogActions;
