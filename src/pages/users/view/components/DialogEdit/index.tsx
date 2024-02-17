import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FooterDialogActions from 'shared/components/footerDialogActions/FooterDialogActions';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import { LISTTYPEUSERS } from 'shared/constants/listTypeUsers';
import {
  defaultValuesUserEdit,
  fieldsUser,
  IFormUser,
  IUserDTO,
  schemaEditUser,
} from 'shared/dtos/IUserDTO';

import { Form } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  user: IUserDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormUser) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

export function DialogEdit({
  user,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps): JSX.Element {
  const { handleSubmit, control } = useForm<IFormUser>({
    resolver: yupResolver(schemaEditUser),
    defaultValues: defaultValuesUserEdit(user),
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog
      fullScreen={smDown}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Form onSubmit={handleSubmit(onSubmitUpdate)} smDown={smDown}>
        <DialogTitle id="responsive-dialog-title">EDITAR USUÁRIO</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp
                name={fieldsUser.NAME}
                control={control}
                label="Nome"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name={fieldsUser.EMAIL}
                control={control}
                label="E-mail"
                type="email"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name={fieldsUser.PASSWORD}
                control={control}
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                disabled={loading}
                renderRight={
                  <IconButton onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <SelectApp
                name={fieldsUser.ROLE}
                control={control}
                label="Acesso"
                options={LISTTYPEUSERS}
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
