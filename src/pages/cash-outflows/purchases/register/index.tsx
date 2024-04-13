import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  CardForm,
  CheckboxApp,
  DatePicker,
  HeaderButtonNav,
  InputFile,
  SelectApp,
  TextFieldApp,
} from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { IFormPurchase } from 'shared/dtos';
import { useProvider, usePurchase } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';

import { defaultValuesPurchase, fieldsPurchase, schemaPurchase } from '../utils';

export function RegisterPurchase() {
  const { handleSubmit, control, reset, formState } = useForm<IFormPurchase>({
    resolver: yupResolver(schemaPurchase),
    defaultValues: defaultValuesPurchase,
  });

  const { handleSubmitCreate, loadingForm: loading } = usePurchase();

  const { allProviders, getProviders } = useProvider();

  useEffect(() => {
    getProviders();
  }, []);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <BaseLayout
      title="Cadastro compras"
      renderHeaderRight={<HeaderButtonNav route={RoutesEnum.PURCHASES} />}
    >
      <CardForm loading={loading} onSubmit={handleSubmit(handleSubmitCreate)}>
        <TextFieldApp
          name={fieldsPurchase.VALUE_TOTAL}
          control={control}
          label="Valor total"
          currency
          required
          disabled={loading}
        />
        <TextFieldApp
          name={fieldsPurchase.OBSERVATION}
          control={control}
          label="Observação"
          disabled={loading}
        />
        <SelectApp
          name={fieldsPurchase.PROVIDER_ID}
          control={control}
          options={allProviders}
          setId
          sortAlphabeticallyObject
          label="Fornecedor"
          required
          disabled={loading}
        />
        <div>
          <Typography>Caso não seja selecionado a data será marcado com a data de hoje</Typography>
          <DatePicker label="Data(opcional)" name={fieldsPurchase.CREATED_AT} control={control} />
        </div>
        <CheckboxApp
          name={fieldsPurchase.ITS_ICE_CREAM_SHOP}
          control={control}
          label="Compra da sorveteria"
          disabled={loading}
        />
        <InputFile
          name={fieldsPurchase.FILE}
          label="Anexe a nota fiscal"
          control={control}
          disabled={loading}
        />
      </CardForm>
    </BaseLayout>
  );
}
