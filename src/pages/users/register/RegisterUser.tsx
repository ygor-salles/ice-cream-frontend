import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Theme, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import { LISTTYPEUSERS } from 'shared/constants/listTypeUsers';
import { RoutesEnum } from 'shared/constants/routesList';
import { defaultValuesUser, IFormUser, schemaCreateUser } from 'shared/dtos/IUserDTO';
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
            <TextFieldApp name="name" control={control} label="Nome" required disabled={loading} />
            <TextFieldApp
              name="email"
              control={control}
              label="E-mail"
              type="email"
              required
              disabled={loading}
            />
            <TextFieldApp
              name="password"
              control={control}
              label="Senha"
              type="password"
              required
              disabled={loading}
            />
            <SelectApp
              name="role"
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
