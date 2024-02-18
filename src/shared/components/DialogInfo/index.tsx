import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { FooterDialogActions } from '../FooterDialogActions';

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
