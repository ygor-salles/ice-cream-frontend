import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FooterDialogActions, TextFieldApp } from 'shared/components';
import {
  IFormCombination,
  defaultValuesCombinationEdit,
  fieldsCombination,
  schemaCreateCombination,
} from 'shared/dtos/ICombinationDTO';

import { Form } from './styles';
import { DialogEditProps } from './types';

export function DialogEdit({
  combination,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps) {
  const { handleSubmit, control } = useForm<IFormCombination>({
    resolver: yupResolver(schemaCreateCombination),
    defaultValues: defaultValuesCombinationEdit(combination),
  });

  return (
    <Dialog
      fullScreen={smDown}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Form onSubmit={handleSubmit(onSubmitUpdate)} smDown={smDown}>
        <DialogTitle id="responsive-dialog-title">EDITAR COMBINAÇÃO</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp
                name={fieldsCombination.NAME}
                control={control}
                label="Nome do fornecedor"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name={fieldsCombination.PRICE}
                control={control}
                label="Preço da combinação"
                currency
                required
                disabled={loading}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <FooterDialogActions
          textButtonConfirm="EDITAR"
          textButtonCancel="CANCELAR"
          onClose={handleClose}
          loading={loading}
        />
      </Form>
    </Dialog>
  );
}
