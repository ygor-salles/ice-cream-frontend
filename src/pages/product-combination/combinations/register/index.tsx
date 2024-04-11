import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonSubmit, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { IFormCombination } from 'shared/dtos';
import { useCombination } from 'shared/hooks';
import { LayoutBaseDePagina } from 'shared/layouts';

import { defaultValuesCombination, fieldsCombination, schemaCombination } from '../utils';
import { Form, GridForm, StyledCard } from './styles';

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

          <ButtonSubmit loading={loading}>CADASTRAR</ButtonSubmit>
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
