import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { defaultValuesUserEdit, fieldsUser, schemaEditUser } from 'pages/users/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DialogForm, SelectApp, TextFieldApp } from 'shared/components';
import { LISTTYPEUSERS } from 'shared/constants';
import { IFormUser } from 'shared/dtos';

import { DialogEditProps } from './types';

export function DialogEdit({ user, onSubmitUpdate, open, handleClose, loading }: DialogEditProps) {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<IFormUser>({
    resolver: yupResolver(schemaEditUser),
    defaultValues: defaultValuesUserEdit(user),
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <DialogForm
      title="EDITAR USUÁRIO"
      loading={loading}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmitUpdate)}
      open={open}
      disabled={!isDirty || !isValid}
    >
      <Grid item xs={12}>
        <TextFieldApp
          name={fieldsUser.NAME}
          control={control}
          label="Nome"
          required
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldApp
          name={fieldsUser.EMAIL}
          control={control}
          label="E-mail"
          type="email"
          required
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldApp
          name={fieldsUser.PASSWORD}
          control={control}
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          disabled={loading}
          renderRight={
            <IconButton onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </Grid>
      <Grid item xs={12}>
        <SelectApp
          name={fieldsUser.ROLE}
          control={control}
          label="Acesso"
          options={LISTTYPEUSERS}
          required
          disabled={loading}
        />
      </Grid>
    </DialogForm>
  );
}
