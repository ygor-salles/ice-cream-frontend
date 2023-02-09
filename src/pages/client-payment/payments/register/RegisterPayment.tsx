import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import { RoutesEnum } from 'shared/constants/routesList';
import { IClientDTO } from 'shared/dtos/IClientDTO';
import { IFormPayment, schemaCreatePayment } from 'shared/dtos/IPaymentDTO';
import { useClient } from 'shared/hooks/network/useClient';
import { usePayment } from 'shared/hooks/network/usePayment';
import { LayoutBaseDePagina } from 'shared/layouts';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Form, GridForm, StyledCard, TextDebit, WrapperDebit } from './styles';

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

  const [clientState, setClientState] = useState<IClientDTO>();

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
            handleSubmitCreate(data, clientState.debit, reset);
            setClientState(null);
          })}
        >
          <StyledCard>
            <GridForm>
              <SelectApp
                name="client_id"
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
                name="value"
                control={control}
                label="Valor do pagamento"
                currency
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
