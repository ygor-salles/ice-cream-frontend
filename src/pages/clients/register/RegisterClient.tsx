import { yupResolver } from '@hookform/resolvers/yup';
import { Theme, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';

import ButtonSubmitApp from '../../../shared/components/button/ButtonSubmitApp';
import { NumberFormatCustom } from '../../../shared/components/number-format-custom/NumberFormatCustom';
import TextFieldApp from '../../../shared/components/textField/TextField';
import { IFormClient, schemaCreateClient } from '../../../shared/dtos/IClientDTO';
import { useClient } from '../../../shared/hooks/network/useClient';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { Form, StyledCard, GridForm } from './styles';

export function RegisterClient(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, reset } = useForm<IFormClient>({
    resolver: yupResolver(schemaCreateClient),
    defaultValues: {
      name: '',
      phone: '',
      debit: '',
    },
  });

  const { handleSubmitCreate, loadingForm: loading } = useClient();

  return (
    <LayoutBaseDePagina
      titulo="Cadastro cliente"
      navigatePage="/clients"
      textButton="VOLTAR"
      icon="arrow_back"
    >
      <Form
        noValidate
        onSubmit={handleSubmit((data: IFormClient) => handleSubmitCreate(data, reset))}
      >
        <StyledCard>
          <GridForm>
            <TextFieldApp
              name="name"
              control={control}
              label="Nome do cliente"
              required
              disabled={loading}
            />
            <TextFieldApp
              name="debit"
              control={control}
              label="Dívida do cliente"
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: NumberFormatCustom as any,
              }}
              disabled={loading}
            />
            <TextFieldApp
              name="phone"
              control={control}
              label="Telefone"
              type="tel"
              mask="(99) 99999-9999"
              disabled={loading}
            />
          </GridForm>

          <ButtonSubmitApp loading={loading} smDown={smDown} textButton="CADASTRAR" />
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
