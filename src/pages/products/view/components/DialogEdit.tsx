import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { NumberFormatCustom } from '../../../../shared/components';
import TextFieldApp from '../../../../shared/components/textField/TextField';
import {
  IFormProduct,
  IProductDTO,
  schemaCreateProduct,
} from '../../../../shared/dtos/IProductDTO';

interface DialogEditProps {
  smDown?: boolean;
  product: IProductDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormProduct) => Promise<void>;
  handleClose: () => void;
}

const StyledButton = styled(Button)(() => ({
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: '#ffffff',
  },
}));

export function DialogEdit({
  product,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
}: DialogEditProps): JSX.Element {
  const { handleSubmit, control } = useForm<IFormProduct>({
    resolver: yupResolver(schemaCreateProduct),
    defaultValues: {
      id: product.id,
      name: product.name,
      price: product.price.toFixed(2).replace('.', ''),
      description: product.description,
    },
  });

  return (
    <Dialog
      fullScreen={smDown}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmitUpdate)}
        sx={{ width: '100%', height: smDown ? '100vh' : 'auto', display: 'contents' }}
      >
        <DialogTitle id="responsive-dialog-title">EDITAR PRODUTO</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextFieldApp
                    name="name"
                    label="Nome do produto"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="price"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextFieldApp
                    label="Preço do produto"
                    value={value}
                    onChange={onChange}
                    name="price"
                    id="price"
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextFieldApp
                    name="description"
                    label="Descrição do produto"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <StyledButton variant="outlined" type="button" onClick={handleClose}>
            CANCELAR
          </StyledButton>
          <Button variant="contained" type="submit">
            EDITAR
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
