import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { FooterDialogActions } from '../FooterDialogActions';
import { DialogAppProps } from './types';

export function DialogDelete({
  open,
  handleClose,
  handleSubmit,
  id,
  title,
  text,
  loading,
}: DialogAppProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text || ''}</DialogContentText>
      </DialogContent>
      <FooterDialogActions
        textButtonCancel="CANCELAR"
        textButtonConfirm="DELETAR"
        loading={!!loading}
        onClose={handleClose}
        isDialogDelete
        onSubmitDelete={handleSubmit}
        id={id}
      />
    </Dialog>
  );
}
