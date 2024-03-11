import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonSubmitApp, SelectApp, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { IClientDTO } from 'shared/dtos/IClientDTO';
import {
  defaultValuesPayment,
  fieldsPayment,
  IFormPayment,
  schemaCreatePayment,
} from 'shared/dtos/IPaymentDTO';
import { useClient } from 'shared/hooks/network/useClient';
import { usePayment } from 'shared/hooks/network/usePayment';
import { LayoutBaseDePagina } from 'shared/layouts';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Form, GridForm, StyledCard, TextDebit, WrapperDebit } from './styles';

export function RegisterPayment() {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, formState, reset } = useForm<IFormPayment>({
    resolver: yupResolver(schemaCreatePayment),
    defaultValues: defaultValuesPayment,
  });

  const { allClients, loadingClients, getClients } = useClient();

  const { handleSubmitCreate, loadingForm: loading } = usePayment();

  const [clientState, setClientState] = useState<IClientDTO | null>();

  const onCloseSelectClient = (event: React.SyntheticEvent<Element, Event>) => {
    const idClient = event?.currentTarget?.id;
    if (idClient) {
      const client = allClients.find(client => client.id === Number(idClient));
      setClientState(client);
    } else {
      setClientState(null);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro pagamento"
      navigatePage={RoutesEnum.PAYMENTS}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      {loadingClients ? (
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        <Form
          noValidate
          onSubmit={handleSubmit((data: IFormPayment) => {
            if (clientState) handleSubmitCreate(data, clientState.debit);
            setClientState(null);
          })}
        >
          <StyledCard>
            <GridForm>
              <SelectApp
                name={fieldsPayment.CLIENT_ID}
                control={control}
                options={allClients}
                setId
                label="Cliente"
                required
                disabled={loading}
                onClose={onCloseSelectClient}
              />
              {clientState && (
                <WrapperDebit>
                  <span>Dívida do cliente: </span>
                  <TextDebit>{formatNumberToCurrency(clientState.debit)}</TextDebit>
                </WrapperDebit>
              )}
              <TextFieldApp
                name={fieldsPayment.VALUE}
                control={control}
                label="Valor do pagamento"
                currency
                required
                disabled={loading}
              />
              <TextFieldApp
                name={fieldsPayment.OBSERVATION}
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
