import { yupResolver } from '@hookform/resolvers/yup';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ButtonSubmitApp from '../../../shared/components/button/ButtonSubmitApp';
import SelectApp from '../../../shared/components/select/Select';
import TextFieldApp from '../../../shared/components/textField/TextField';
import { IFormPayment, schemaCreatePayment } from '../../../shared/dtos/IPaymentDTO';
import { useClient } from '../../../shared/hooks/network/useClient';
import { usePayment } from '../../../shared/hooks/network/usePayment';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { Form, GridForm, StyledCard } from './styles';

export function RegisterPayment(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, reset } = useForm<IFormPayment>({
    resolver: yupResolver(schemaCreatePayment),
    defaultValues: {
      value: '',
      client_id: '',
      observation: '',
    },
  });

  const { allClients, loadingClients, getClients } = useClient();

  const { handleSubmitCreate, loadingForm: loading } = usePayment();

  useEffect(() => {
    getClients();
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro pagamento"
      navigatePage="/payments"
      textButton="VOLTAR"
      icon="arrow_back"
    >
      {loadingClients ? (
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        <Form
          noValidate
          onSubmit={handleSubmit((data: IFormPayment) => handleSubmitCreate(data, reset))}
        >
          <StyledCard>
            <GridForm>
              <TextFieldApp
                name="value"
                control={control}
                label="Valor do pagamento"
                currency
                required
                disabled={loading}
              />
              <SelectApp
                name="client_id"
                control={control}
                array={allClients}
                setId
                label="Cliente"
                required
                disabled={loading}
              />
              <TextFieldApp
                name="observation"
                control={control}
                label="Observação"
                disabled={loading}
              />
            </GridForm>

            <ButtonSubmitApp loading={loading} smDown={smDown} textButton="CADASTRAR" />
          </StyledCard>
        </Form>
      )}
    </LayoutBaseDePagina>
  );
}
