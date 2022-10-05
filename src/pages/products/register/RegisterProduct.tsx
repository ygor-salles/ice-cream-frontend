import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Theme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import { NumberFormatCustom } from '../../../shared/components/number-format-custom/NumberFormatCustom';
import SelectApp from '../../../shared/components/select/Select';
import TextFieldApp from '../../../shared/components/textField/TextField';
import { LISTTYPEPRODUCTS } from '../../../shared/constants/listTypeProduct';
import { IFormProduct, schemaCreateProduct } from '../../../shared/dtos/IProductDTO';
import { useProduct } from '../../../shared/hooks/network/useProduct';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { Form, StyledCard, GridForm, ContentButton } from './styles';

export function RegisterProduct(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmitCreate, loadingForm: loading } = useProduct();

  const { handleSubmit, control, reset } = useForm<IFormProduct>({
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
            />
          </GridForm>

          <ContentButton>
            <Button
              type="submit"
              variant="contained"
              fullWidth={!!smDown}
              sx={{
                bgcolor: 'primary',
                padding: smDown ? '10px' : 'auto',
                fontSize: smDown ? '1rem' : 'auto',
              }}
              endIcon={
                loading ? (
                  <CircularProgress variant="indeterminate" color="inherit" size={20} />
                ) : undefined
              }
              disabled={loading}
            >
              CADASTRAR
            </Button>
          </ContentButton>
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
