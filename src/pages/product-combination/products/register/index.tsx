import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CardForm, SelectApp, TextFieldApp } from 'shared/components';
import { LISTTYPEPRODUCTS, RoutesEnum } from 'shared/constants';
import { IFormProduct } from 'shared/dtos';
import { useProduct } from 'shared/hooks';
import { LayoutBaseDePagina } from 'shared/layouts';

import { defaultValuesProduct, fieldsProduct, schemaProduct } from '../utils';

export function RegisterProduct() {
  const { handleSubmitCreate, loadingForm: loading } = useProduct();

  const { handleSubmit, control, reset, formState } = useForm<IFormProduct>({
    resolver: yupResolver(schemaProduct),
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
      <CardForm loading={loading} onSubmit={handleSubmit(handleSubmitCreate)}>
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
      </CardForm>
    </LayoutBaseDePagina>
  );
}
