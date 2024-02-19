import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Button, Skeleton, Theme, Typography, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ButtonSubmitApp, DatePicker, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import {
  defaultValuesCashClosing,
  fieldsSale,
  IFormCashClosing,
  schemaCreateCashClosing,
} from 'shared/dtos/ISaleDTO';
import { useSale } from 'shared/hooks/network/useSale';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function DailyCashClosing() {
  const navigate = useNavigate();

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

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
    <LayoutBaseDePagina
      titulo="Fechamento caixa"
      renderHeaderButton={
        <Button
          color="info"
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(RoutesEnum.CASH_RECEIPTS)}
        >
          VOLTAR
        </Button>
      }
    >
      {loadingForm ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <Form onSubmit={handleSubmit(handleSubmitCreateCashClosing)}>
          <StyledCard>
            <GridForm>
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
            </GridForm>

            <ButtonSubmitApp loading={loadingForm} smDown={smDown} textButton="CADASTRAR" />
          </StyledCard>
        </Form>
      )}
    </LayoutBaseDePagina>
  );
}
