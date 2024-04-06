import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonSubmitApp, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import {
  defaultValuesCombination,
  fieldsCombination,
  IFormCombination,
  schemaCreateCombination,
} from 'shared/dtos/ICombinationDTO';
import { useCombination } from 'shared/hooks/network/useCombination';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function RegisterCombination() {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, formState, reset } = useForm<IFormCombination>({
    resolver: yupResolver(schemaCreateCombination),
    defaultValues: defaultValuesCombination,
  });

  const { handleSubmitCreate, loadingForm: loading } = useCombination();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro combinação"
      navigatePage={RoutesEnum.COMBINATIONS}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      <Form onSubmit={handleSubmit(handleSubmitCreate)}>
        <StyledCard>
          <GridForm>
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
          </GridForm>

          <ButtonSubmitApp loading={loading} smDown={smDown} textButton="CADASTRAR" />
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
