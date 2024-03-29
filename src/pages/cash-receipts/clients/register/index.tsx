import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import TextFieldApp from 'shared/components/textField/TextField';
import { RoutesEnum } from 'shared/constants/routesList';
import {
  defaultValuesClient,
  fieldsClient,
  IFormClient,
  schemaCreateClient,
} from 'shared/dtos/IClientDTO';
import { useClient } from 'shared/hooks/network/useClient';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function RegisterClient(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, formState, reset } = useForm<IFormClient>({
    resolver: yupResolver(schemaCreateClient),
    defaultValues: defaultValuesClient,
  });

  const { handleSubmitCreate, loadingForm: loading } = useClient();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro cliente"
      navigatePage={RoutesEnum.CLIENTS}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      <Form onSubmit={handleSubmit(handleSubmitCreate)}>
        <StyledCard>
          <GridForm>
            <TextFieldApp
              name={fieldsClient.NAME}
              control={control}
              label="Nome do cliente"
              required
              disabled={loading}
            />
            <TextFieldApp
              name={fieldsClient.DEBIT}
              control={control}
              label="Dívida do cliente"
              currency
              disabled={loading}
            />
            <TextFieldApp
              name={fieldsClient.PHONE}
              control={control}
              label="Telefone"
              type="tel"
              mask="(00) 00000-0000"
              disabled={loading}
            />
          </GridForm>

          <ButtonSubmitApp loading={loading} smDown={smDown} textButton="CADASTRAR" />
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
