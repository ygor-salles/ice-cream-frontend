import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { NumberFormatCustom } from '../../../../shared/components';
import TextFieldApp from '../../../../shared/components/textField/TextField';
import {
  IFormProduct,
  IProductDTO,
  schemaCreateProduct,
} from '../../../../shared/dtos/IProductDTO';
import { Form, StyledButton, StyledDialogActions } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  product: IProductDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormProduct) => Promise<void>;
  handleClose: () => void;
}

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
      <Form noValidate onSubmit={handleSubmit(onSubmitUpdate)} smDown={smDown}>
        <DialogTitle id="responsive-dialog-title">EDITAR PRODUTO</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp name="name" control={control} label="Nome do produto" required />
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp name="description" control={control} label="Descrição do produto" />
            </Grid>
          </Grid>
        </DialogContent>
        <StyledDialogActions>
          <StyledButton variant="outlined" type="button" onClick={handleClose}>
            CANCELAR
          </StyledButton>
          <Button variant="contained" type="submit">
            EDITAR
          </Button>
        </StyledDialogActions>
      </Form>
    </Dialog>
  );
}
