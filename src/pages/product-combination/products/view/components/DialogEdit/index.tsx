import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DialogForm, SelectApp, TextFieldApp } from 'shared/components';
import { LISTTYPEPRODUCTS } from 'shared/constants';
import { IFormProduct } from 'shared/dtos';

import { defaultValuesProductEdit, fieldsProduct, schemaProduct } from '../../../utils';
import { DialogEditProps } from './types';

export function DialogEdit({
  product,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps) {
  const { handleSubmit, control } = useForm<IFormProduct>({
    resolver: yupResolver(schemaProduct),
    defaultValues: defaultValuesProductEdit(product),
  });

  return (
    <DialogForm
      title="EDITAR PRODUTO"
      loading={loading}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmitUpdate)}
      open={open}
    >
      <Grid item xs={12}>
        <TextFieldApp
          name={fieldsProduct.NAME}
          control={control}
          label="Nome do produto"
          required
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldApp
          name={fieldsProduct.PRICE}
          control={control}
          label="Preço do produto"
          currency
          required
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldApp
          name={fieldsProduct.DESCRIPTION}
          control={control}
          label="Descrição do produto"
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectApp
          name={fieldsProduct.TYPE}
          control={control}
          options={LISTTYPEPRODUCTS}
          label="Tipo"
          disabled={loading}
        />
      </Grid>
    </DialogForm>
  );
}
