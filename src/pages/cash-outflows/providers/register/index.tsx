import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CardForm, CheckboxApp, HeaderButtonNav, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { IFormProvider } from 'shared/dtos';
import { useProvider } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';

import { defaultValuesProvider, fieldsProvider, schemaProvider } from '../utils';

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
    <BaseLayout
      title="Cadastro fornecedor"
      renderHeaderRight={<HeaderButtonNav route={RoutesEnum.PROVIDERS} />}
    >
      <CardForm loading={loading} onSubmit={handleSubmit(handleSubmitCreate)}>
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
      </CardForm>
    </BaseLayout>
  );
}
