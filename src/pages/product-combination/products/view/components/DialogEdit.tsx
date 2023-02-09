import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import FooterDialogActions from 'shared/components/footerDialogActions/FooterDialogActions';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import { LISTTYPEPRODUCTS } from 'shared/constants/listTypeProduct';
import {
  defaultValuesProductEdit,
  IFormProduct,
  IProductDTO,
  schemaCreateProduct,
} from 'shared/dtos/IProductDTO';

import { Form } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  product: IProductDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormProduct) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

export function DialogEdit({
  product,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps): JSX.Element {
  const { handleSubmit, control } = useForm<IFormProduct>({
    resolver: yupResolver(schemaCreateProduct),
    defaultValues: defaultValuesProductEdit(product),
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
                currency
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
            <Grid item xs={12}>
              <SelectApp
                name="type"
                control={control}
                options={LISTTYPEPRODUCTS}
                label="Tipo"
                disabled={loading}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <FooterDialogActions
          textButtonConfirm="EDITAR"
          textButtonCancel="CANCELAR"
          onClose={handleClose}
          loading={loading}
        />
      </Form>
    </Dialog>
  );
}
