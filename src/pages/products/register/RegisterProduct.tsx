import { yupResolver } from '@hookform/resolvers/yup';
import { Theme, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';

import ButtonSubmitApp from '../../../shared/components/button/ButtonSubmitApp';
import { NumberFormatCustom } from '../../../shared/components/number-format-custom/NumberFormatCustom';
import SelectApp from '../../../shared/components/select/Select';
import TextFieldApp from '../../../shared/components/textField/TextField';
import { LISTTYPEPRODUCTS } from '../../../shared/constants/listTypeProduct';
import { IFormProduct, schemaCreateProduct } from '../../../shared/dtos/IProductDTO';
import { useProduct } from '../../../shared/hooks/network/useProduct';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { Form, StyledCard, GridForm } from './styles';

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
    defaultValues: {
      name: '',
      price: '',
      description: '',
      type: '',
    },
  });

  return (
    <LayoutBaseDePagina
      titulo="Cadastro produto"
      navigatePage="/products"
      textButton="VOLTAR"
      icon="arrow_back"
    >
      <Form
        noValidate
        onSubmit={handleSubmit((data: IFormProduct) => handleSubmitCreate(data, reset))}
      >
        <StyledCard>
          <GridForm>
            <TextFieldApp
              name="name"
              control={control}
              label="Nome do produto"
              required
              disabled={loading}
            />
            <TextFieldApp
              name="price"
              control={control}
              label="Preço do produto"
              InputProps={{
                inputComponent: NumberFormatCustom as any,
              }}
              required
              disabled={loading}
            />
            <TextFieldApp
              name="description"
              control={control}
              label="Descrição do produto"
              disabled={loading}
            />
            <SelectApp
              name="type"
              control={control}
              array={LISTTYPEPRODUCTS}
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
