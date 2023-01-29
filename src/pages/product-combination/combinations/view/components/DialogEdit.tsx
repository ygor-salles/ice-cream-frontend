import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import FooterDialogActions from 'shared/components/footerDialogActions/FooterDialogActions';
import TextFieldApp from 'shared/components/textField/TextField';
import {
  ICombinationDTO,
  IFormCombination,
  schemaCreateCombination,
} from 'shared/dtos/ICombinationDTO';

import { Form } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  combination: ICombinationDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormCombination) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

export function DialogEdit({
  combination,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps): JSX.Element {
  const { handleSubmit, control } = useForm<IFormCombination>({
    resolver: yupResolver(schemaCreateCombination),
    defaultValues: {
      id: combination.id,
      name: combination.name,
      price: combination.price.toFixed(2).replace('.', ''),
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
        <DialogTitle id="responsive-dialog-title">EDITAR COMBINAÇÃO</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp
                name="name"
                control={control}
                label="Nome do fornecedor"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name="price"
                control={control}
                label="Preço da combinação"
                currency
                required
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
