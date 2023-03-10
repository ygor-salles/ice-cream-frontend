import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Theme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import { LISTTYPEUSERS } from 'shared/constants/listTypeUsers';
import { RoutesEnum } from 'shared/constants/routesList';
import { defaultValuesUser, fieldsUser, IFormUser, schemaCreateUser } from 'shared/dtos/IUserDTO';
import { useUser } from 'shared/hooks/network/useUser';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function RegisterUser(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, reset } = useForm<IFormUser>({
    resolver: yupResolver(schemaCreateUser),
    defaultValues: defaultValuesUser,
  });

  const { handleSubmitCreate, loadingForm: loading } = useUser();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro usuário"
      navigatePage={RoutesEnum.USERS}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      <Form
        noValidate
        onSubmit={handleSubmit((data: IFormUser) => handleSubmitCreate(data, reset))}
      >
        <StyledCard>
          <GridForm>
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
          </GridForm>

          <ButtonSubmitApp loading={loading} smDown={smDown} textButton="CADASTRAR" />
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
