import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonSubmitApp, SelectApp, TextFieldApp } from 'shared/components';
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

export function RegisterProduct() {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmitCreate, loadingForm: loading } = useProduct();

  const { handleSubmit, control, reset, formState } = useForm<IFormProduct>({
    resolver: yupResolver(schemaCreateProduct),
    defaultValues: defaultValuesProduct,
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro produto"
      navigatePage={RoutesEnum.PRODUCTS}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      <Form onSubmit={handleSubmit(handleSubmitCreate)}>
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
