import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Theme, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import CheckboxApp from 'shared/components/checkbox/CheckboxApp';
import TextFieldApp from 'shared/components/textField/TextField';
import { RoutesEnum } from 'shared/constants/routesList';
import {
  defaultValuesProvider,
  fieldsProvider,
  IFormProvider,
  schemaCreateProvider,
} from 'shared/dtos/IProviderDTO';
import { useProvider } from 'shared/hooks/network/useProvider';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function RegisterProvider(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, reset } = useForm<IFormProvider>({
    resolver: yupResolver(schemaCreateProvider),
    defaultValues: defaultValuesProvider,
  });

  const { handleSubmitCreate, loadingForm: loading } = useProvider();

  return (
    <LayoutBaseDePagina
      titulo="Cadastro fornecedor"
      navigatePage={RoutesEnum.PROVIDERS}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      <Form
        noValidate
        onSubmit={handleSubmit((data: IFormProvider) => handleSubmitCreate(data, reset))}
      >
        <StyledCard>
          <GridForm>
            <TextFieldApp
              name={fieldsProvider.NAME}
              control={control}
              label="Nome do fornecedor"
              required
              disabled={loading}
            />
            <TextFieldApp
              name={fieldsProvider.PHONE}
              control={control}
              type="tel"
              mask="(00) 00000-0000"
              label="Telefone"
              disabled={loading}
            />
            <CheckboxApp
              name={fieldsProvider.ITS_ICE_CREAM_SHOP}
              control={control}
              label="Fornecedor da sorveteria"
              disabled={loading}
            />
          </GridForm>

          <ButtonSubmitApp loading={loading} smDown={smDown} textButton="CADASTRAR" />
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
