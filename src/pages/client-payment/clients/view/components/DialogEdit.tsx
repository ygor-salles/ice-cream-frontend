import { yupResolver } from '@hookform/resolvers/yup';
import { ReportOff, Report } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Grid, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FooterDialogActions from 'shared/components/footerDialogActions/FooterDialogActions';
import TextFieldApp from 'shared/components/textField/TextField';
import {
  defaultValuesClientEdit,
  IClientDTO,
  IFormClient,
  schemaCreateClient,
} from 'shared/dtos/IClientDTO';

import { Form, stylesIcon } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  client: IClientDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormClient) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

export function DialogEdit({
  client,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps): JSX.Element {
  const { handleSubmit, control } = useForm<IFormClient>({
    resolver: yupResolver(schemaCreateClient),
    defaultValues: defaultValuesClientEdit(client),
  });

  const [disabledState, setDisabledState] = useState(true);
  const [showModalAlert, setShowModalAlert] = useState(false);

  const onToggleModalAlert = () => setShowModalAlert(prev => !prev);
  const onToggleDisabledState = () => setDisabledState(prev => !prev);

  return (
    <>
      <Dialog fullScreen={smDown} open={open} onClose={handleClose}>
        <Form noValidate onSubmit={handleSubmit(onSubmitUpdate)} smDown={smDown}>
          <DialogTitle>EDITAR PRODUTO</DialogTitle>
          <DialogContent>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextFieldApp
                  name="name"
                  control={control}
                  label="Nome do cliente"
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldApp
                  name="debit"
                  control={control}
                  label="Dívida do cliente"
                  currency
                  required
                  disabled={loading || disabledState}
                  renderRight={
                    disabledState ? (
                      <Tooltip title="Atenção, ao alterar a dívida do cliente diretamente, pode causar inconsistências nos valores">
                        <ReportOff onClick={onToggleModalAlert} style={stylesIcon} />
                      </Tooltip>
                    ) : (
                      <Report onClick={onToggleDisabledState} style={stylesIcon} />
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldApp
                  name="phone"
                  control={control}
                  label="Telefone"
                  type="tel"
                  mask="(00) 00000-0000"
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

      <Dialog open={showModalAlert} onClose={onToggleModalAlert}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          Ao alterar a dívida do cliente diretamente, pode causar inconsistências nos valores
        </DialogContent>
        <FooterDialogActions
          textButtonConfirm="OK"
          textButtonCancel="CANCELAR"
          onClose={onToggleModalAlert}
          isDialogDelete
          onSubmitDelete={() => {
            onToggleModalAlert();
            onToggleDisabledState();
          }}
          loading={false}
        />
      </Dialog>
    </>
  );
}
