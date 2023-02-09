import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Theme, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import TextFieldApp from 'shared/components/textField/TextField';
import { RoutesEnum } from 'shared/constants/routesList';
import {
  defaultValuesCombination,
  IFormCombination,
  schemaCreateCombination,
} from 'shared/dtos/ICombinationDTO';
import { useCombination } from 'shared/hooks/network/useCombination';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function RegisterCombination(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, reset } = useForm<IFormCombination>({
    resolver: yupResolver(schemaCreateCombination),
    defaultValues: defaultValuesCombination,
  });

  const { handleSubmitCreate, loadingForm: loading } = useCombination();

  return (
    <LayoutBaseDePagina
      titulo="Cadastro combinação"
      navigatePage={RoutesEnum.COMBINATIONS}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      <Form
        noValidate
        onSubmit={handleSubmit((data: IFormCombination) => handleSubmitCreate(data, reset))}
      >
        <StyledCard>
          <GridForm>
            <TextFieldApp
              name="name"
              control={control}
              label="Nome da combinação"
              required
              disabled={loading}
            />
            <TextFieldApp
              name="price"
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
