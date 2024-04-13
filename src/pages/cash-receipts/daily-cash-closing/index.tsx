import { yupResolver } from '@hookform/resolvers/yup';
import { Skeleton, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CardForm, DatePicker, HeaderButtonNav, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { IFormCashClosing } from 'shared/dtos';
import { useSale } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';

import { fieldsSale } from '../sales/utils';
import { defaultValuesCashClosing, schemaCreateCashClosing } from './utils';

export function DailyCashClosing() {
  const { handleSubmitCreateCashClosing, loadingForm } = useSale();

  const { handleSubmit, control, formState, reset } = useForm<IFormCashClosing>({
    resolver: yupResolver(schemaCreateCashClosing),
    defaultValues: defaultValuesCashClosing,
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <BaseLayout
      title="Fechamento caixa"
      renderHeaderRight={<HeaderButtonNav route={RoutesEnum.CASH_RECEIPTS} />}
    >
      {loadingForm ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <CardForm loading={loadingForm} onSubmit={handleSubmit(handleSubmitCreateCashClosing)}>
          <TextFieldApp
            name={fieldsSale.TOTAL}
            control={control}
            label="Total"
            currency
            required
            disabled={loadingForm}
          />
          <div>
            <Typography>
              Caso não seja selecionado a data será marcado com a data de hoje
            </Typography>
            <DatePicker label="Data(opcional)" name={fieldsSale.CREATED_AT} control={control} />
          </div>
        </CardForm>
      )}
    </BaseLayout>
  );
}
