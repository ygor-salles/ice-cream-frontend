import { Button } from '@mui/material';

import { StyledButton, StyledDialogActions } from './styles';

interface FooterDialogActionsProps {
  textButtonCancel: string;
  textButtonConfirm: string;
  onClose: () => void;
}

const FooterDialogActions: React.FC<FooterDialogActionsProps> = ({
  textButtonCancel,
  textButtonConfirm,
  onClose,
}) => {
  return (
    <StyledDialogActions>
      <StyledButton variant="outlined" type="button" onClick={onClose}>
        {textButtonCancel}
      </StyledButton>
      <Button variant="contained" type="submit">
        {textButtonConfirm}
      </Button>
    </StyledDialogActions>
  );
};

export default FooterDialogActions;
