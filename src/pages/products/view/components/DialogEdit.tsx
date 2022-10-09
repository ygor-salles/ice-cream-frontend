import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { NumberFormatCustom } from '../../../../shared/components';
import FooterDialogActions from '../../../../shared/components/footerDialogActions/FooterDialogActions';
import SelectApp from '../../../../shared/components/select/Select';
import TextFieldApp from '../../../../shared/components/textField/TextField';
import { LISTTYPEPRODUCTS } from '../../../../shared/constants/listTypeProduct';
import {
  IFormProduct,
  IProductDTO,
  schemaCreateProduct,
} from '../../../../shared/dtos/IProductDTO';
import { Form } from './styles';

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
      type: product.type,
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
            <Grid item xs={12}>
              <SelectApp name="type" control={control} array={LISTTYPEPRODUCTS} label="Tipo" />
            </Grid>
          </Grid>
        </DialogContent>

        <FooterDialogActions
          textButtonConfirm="EDITAR"
          textButtonCancel="CANCELAR"
          onClose={handleClose}
        />
      </Form>
    </Dialog>
  );
}
