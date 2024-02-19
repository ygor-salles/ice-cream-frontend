import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { FooterDialogActions } from '../FooterDialogActions';
import { DialogAppProps } from './types';

export function DialogInfo({
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
    <Dialog fullScreen={smDown} open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text || ''}</DialogContentText>
      </DialogContent>
      <FooterDialogActions
        textButtonCancel={textButtonClose}
        textButtonConfirm={textButtonSubmit}
        loading={loading}
        onClose={handleClose}
        isDialogDelete
        onSubmitDelete={handleSubmit}
        id={id}
      />
    </Dialog>
  );
}
