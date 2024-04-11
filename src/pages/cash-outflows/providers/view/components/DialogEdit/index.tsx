import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import {
  defaultValuesProviderEdit,
  fieldsProvider,
  schemaProvider,
} from 'pages/cash-outflows/providers/utils';
import { useForm } from 'react-hook-form';
import { CheckboxApp, DialogForm, TextFieldApp } from 'shared/components';
import { IFormProvider } from 'shared/dtos';

import { DialogEditProps } from './types';

export function DialogEdit({
  provider,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps) {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<IFormProvider>({
    resolver: yupResolver(schemaProvider),
    defaultValues: defaultValuesProviderEdit(provider),
  });

  return (
    <DialogForm
      loading={loading}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmitUpdate)}
      title="EDITAR FORNECEDOR"
      open={open}
      disabled={!isDirty || !isValid}
    >
      <Grid item xs={12}>
        <TextFieldApp
          name={fieldsProvider.NAME}
          control={control}
          label="Nome do fornecedor"
          required
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldApp
          name={fieldsProvider.PHONE}
          type="tel"
          mask="(00) 00000-0000"
          control={control}
          label="Telefone"
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <CheckboxApp
          name={fieldsProvider.ITS_ICE_CREAM_SHOP}
          control={control}
          label="Fornecedor da sorveteria"
          disabled={loading}
        />
      </Grid>
    </DialogForm>
  );
}
