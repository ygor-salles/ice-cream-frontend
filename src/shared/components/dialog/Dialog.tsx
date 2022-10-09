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
  handleSubmit?: (id: number) => void;
  id?: number;
  textButtonClose: string;
  textButtonSubmit: string;
  title: string;
  text: string;
  loading?: boolean;
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
  id,
  textButtonClose,
  textButtonSubmit,
  title,
  text,
  loading,
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
        <StyledButton autoFocus variant="outlined" onClick={handleClose} disabled={loading}>
          {textButtonClose}
        </StyledButton>
        <Button variant="contained" onClick={() => handleSubmit(id)} disabled={loading}>
          {textButtonSubmit}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
