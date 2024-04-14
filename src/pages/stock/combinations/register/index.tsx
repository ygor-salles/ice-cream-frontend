import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CardForm, HeaderButtonNav, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { IFormCombination } from 'shared/dtos';
import { useCombination } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';

import { defaultValuesCombination, fieldsCombination, schemaCombination } from '../utils';

export function RegisterCombination() {
  const { handleSubmit, control, formState, reset } = useForm<IFormCombination>({
    resolver: yupResolver(schemaCombination),
    defaultValues: defaultValuesCombination,
  });

  const { handleSubmitCreate, loadingForm: loading } = useCombination();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <BaseLayout
      title="Cadastro combinação"
      renderHeaderRight={<HeaderButtonNav route={RoutesEnum.COMBINATIONS} />}
    >
      <CardForm loading={loading} onSubmit={handleSubmit(handleSubmitCreate)}>
        <TextFieldApp
          name={fieldsCombination.NAME}
          control={control}
          label="Nome da combinação"
          required
          disabled={loading}
        />
        <TextFieldApp
          name={fieldsCombination.PRICE}
          control={control}
          label="Preço da combinação"
          currency
          required
          disabled={loading}
        />
      </CardForm>
    </BaseLayout>
  );
}
