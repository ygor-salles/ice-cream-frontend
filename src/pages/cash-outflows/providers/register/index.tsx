import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonSubmit, CheckboxApp, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { IFormProvider } from 'shared/dtos';
import { useProvider } from 'shared/hooks';
import { LayoutBaseDePagina } from 'shared/layouts';

import { defaultValuesProvider, fieldsProvider, schemaProvider } from '../utils';
import { Form, GridForm, StyledCard } from './styles';

export function RegisterProvider() {
  const { handleSubmit, control, formState, reset } = useForm<IFormProvider>({
    resolver: yupResolver(schemaProvider),
    defaultValues: defaultValuesProvider,
  });

  const { handleSubmitCreate, loadingForm: loading } = useProvider();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro fornecedor"
      navigatePage={RoutesEnum.PROVIDERS}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      <Form onSubmit={handleSubmit(handleSubmitCreate)}>
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

          <ButtonSubmit loading={loading}>CADASTRAR</ButtonSubmit>
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
