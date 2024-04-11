import { Dialog, DialogContent, DialogTitle, Grid, Theme, useMediaQuery } from '@mui/material';

import { FooterDialogActions } from '../FooterDialogActions';
import { Form } from './styles';
import { DialogFormProps } from './types';

export function DialogForm(props: DialogFormProps) {
  const { children, loading, onClose, onSubmit, open, title, disabled } = props;

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={smDown}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Form onSubmit={onSubmit}>
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            {children}
          </Grid>
        </DialogContent>
        <FooterDialogActions
          textButtonConfirm="EDITAR"
          textButtonCancel="CANCELAR"
          onClose={onClose}
          loading={loading}
          disabled={disabled}
        />
      </Form>
    </Dialog>
  );
}
