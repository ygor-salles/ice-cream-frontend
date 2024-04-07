import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DialogForm, TextFieldApp } from 'shared/components';
import { IFormCombination } from 'shared/dtos';

import { defaultValuesCombinationEdit, fieldsCombination, schemaCombination } from '../../../utils';
import { DialogEditProps } from './types';

export function DialogEdit({
  combination,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps) {
  const { handleSubmit, control } = useForm<IFormCombination>({
    resolver: yupResolver(schemaCombination),
    defaultValues: defaultValuesCombinationEdit(combination),
  });

  return (
    <DialogForm
      title="EDITAR COMBINAÇÃO"
      loading={loading}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmitUpdate)}
      open={open}
    >
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
    </DialogForm>
  );
}
