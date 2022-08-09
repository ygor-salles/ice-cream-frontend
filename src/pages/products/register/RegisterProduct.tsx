import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Theme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';

import { NumberFormatCustom } from '../../../shared/components/number-format-custom/NumberFormatCustom';
import TextFieldApp from '../../../shared/components/textField/TextField';
import { IFormProduct, schemaCreateProduct } from '../../../shared/dtos/IProductDTO';
import { useProduct } from '../../../shared/hooks/network/useProduct';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { Form, StyledCard } from './styles';

export function RegisterProduct(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmitCreate, loadingForm: loading } = useProduct();

  const { handleSubmit, control, reset } = useForm<IFormProduct>({
    resolver: yupResolver(schemaCreateProduct),
    defaultValues: {
      name: '',
      price: '',
      description: '',
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
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp
                name="name"
                control={control}
                label="Nome do produto"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name="description"
                control={control}
                label="Descrição do produto"
                disabled={loading}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 6 }}>
            <Grid item display="flex" justifyContent="flex-end" width="100%">
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
            </Grid>
          </Grid>
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
