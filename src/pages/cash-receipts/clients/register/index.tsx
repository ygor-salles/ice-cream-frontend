import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CardForm, HeaderButtonNav, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { IFormClient } from 'shared/dtos';
import { useClient } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';

import { defaultValuesClient, fieldsClient, schemaClient } from '../utils';

export function RegisterClient() {
  const { handleSubmit, control, formState, reset } = useForm<IFormClient>({
    resolver: yupResolver(schemaClient),
    defaultValues: defaultValuesClient,
  });

  const { handleSubmitCreate, loadingForm: loading } = useClient();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <BaseLayout
      title="Cadastro cliente"
      renderHeaderRight={<HeaderButtonNav route={RoutesEnum.CLIENTS} />}
    >
      <CardForm loading={loading} onSubmit={handleSubmit(handleSubmitCreate)}>
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
      </CardForm>
    </BaseLayout>
  );
}
