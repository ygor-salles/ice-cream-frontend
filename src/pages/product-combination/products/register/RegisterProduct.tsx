import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Theme, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import { LISTTYPEPRODUCTS } from 'shared/constants/listTypeProduct';
import { RoutesEnum } from 'shared/constants/routesList';
import {
  defaultValuesProduct,
  fieldsProduct,
  IFormProduct,
  schemaCreateProduct,
} from 'shared/dtos/IProductDTO';
import { useProduct } from 'shared/hooks/network/useProduct';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function RegisterProduct(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmitCreate, loadingForm: loading } = useProduct();

  const {
    handleSubmit,
    control,
    reset,
    // formState: { isDirty, isValid },
  } = useForm<IFormProduct>({
    resolver: yupResolver(schemaCreateProduct),
    defaultValues: defaultValuesProduct,
  });

  return (
    <LayoutBaseDePagina
      titulo="Cadastro produto"
      navigatePage={RoutesEnum.PRODUCTS}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      <Form
        noValidate
        onSubmit={handleSubmit((data: IFormProduct) => handleSubmitCreate(data, reset))}
      >
        <StyledCard>
          <GridForm>
            <TextFieldApp
              name={fieldsProduct.NAME}
              control={control}
              label="Nome do produto"
              required
              disabled={loading}
            />
            <TextFieldApp
              name={fieldsProduct.PRICE}
              control={control}
              label="Preço do produto"
              currency
              required
              disabled={loading}
            />
            <TextFieldApp
              name={fieldsProduct.DESCRIPTION}
              control={control}
              label="Descrição do produto"
              disabled={loading}
            />
            <SelectApp
              name={fieldsProduct.TYPE}
              control={control}
              options={LISTTYPEPRODUCTS}
              label="Tipo"
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
