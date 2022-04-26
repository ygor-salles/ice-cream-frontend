import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import styled from 'styled-components';

interface DialogAppProps {
  smDown?: boolean;
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  textButtonClose: string;
  textButtonSubmit: string;
  title: string;
  text: string;
}

const StyledButton = styled(Button)(() => ({
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: '#ffffff',
  },
}));

export default function DialogInfo({
  smDown,
  open,
  handleClose,
  handleSubmit,
  textButtonClose,
  textButtonSubmit,
  title,
  text,
}: DialogAppProps) {
  return (
    <Dialog
      fullScreen={smDown}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text || ''}</DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'space-between' }}>
        <StyledButton autoFocus variant="outlined" onClick={handleClose}>
          {textButtonClose}
        </StyledButton>
        <Button variant="contained" onClick={handleSubmit}>
          {textButtonSubmit}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
