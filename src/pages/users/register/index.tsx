import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CardForm, HeaderButtonNav, SelectApp, TextFieldApp } from 'shared/components';
import { LISTTYPEUSERS, RoutesEnum } from 'shared/constants';
import { IFormUser } from 'shared/dtos';
import { useUser } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';

import { defaultValuesUser, fieldsUser, schemaCreateUser } from '../utils';

export function RegisterUser() {
  const { handleSubmit, control, formState, reset } = useForm<IFormUser>({
    resolver: yupResolver(schemaCreateUser),
    defaultValues: defaultValuesUser,
  });

  const { handleSubmitCreate, loadingForm: loading } = useUser();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <BaseLayout
      title="Cadastro usuário"
      renderHeaderRight={<HeaderButtonNav route={RoutesEnum.USERS} />}
    >
      <CardForm loading={loading} onSubmit={handleSubmit(handleSubmitCreate)}>
        <TextFieldApp
          name={fieldsUser.NAME}
          control={control}
          label="Nome"
          required
          disabled={loading}
        />
        <TextFieldApp
          name={fieldsUser.EMAIL}
          control={control}
          label="E-mail"
          type="email"
          required
          disabled={loading}
        />
        <TextFieldApp
          name={fieldsUser.PASSWORD}
          control={control}
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          required
          disabled={loading}
          renderRight={
            <IconButton onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
        <SelectApp
          name={fieldsUser.ROLE}
          control={control}
          label="Acesso"
          options={LISTTYPEUSERS}
          required
          disabled={loading}
        />
      </CardForm>
    </BaseLayout>
  );
}
