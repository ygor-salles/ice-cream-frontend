import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import TextFieldApp from '../../../../shared/components/textField/TextField';
import { IFormUser, IUserDTO, schemaCreateUser } from '../../../../shared/dtos/IUserDTO';
import { Form, StyledButton, StyledDialogActions } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  user: IUserDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormUser) => Promise<void>;
  handleClose: () => void;
}

export function DialogEdit({
  user,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
}: DialogEditProps): JSX.Element {
  const { handleSubmit, control } = useForm<IFormUser>({
    resolver: yupResolver(schemaCreateUser),
    defaultValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
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
        <DialogTitle id="responsive-dialog-title">EDITAR USUÁRIO</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp name="name" control={control} label="Nome" required />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp name="email" control={control} label="E-mail" type="email" required />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name="password"
                control={control}
                label="Senha"
                type="password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp name="role" control={control} label="Acesso" />
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
