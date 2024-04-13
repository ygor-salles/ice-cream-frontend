import { yupResolver } from '@hookform/resolvers/yup';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CardForm, HeaderButtonNav, SelectApp, TextFieldApp } from 'shared/components';
import { RoutesEnum } from 'shared/constants';
import { IClientDTO, IFormPayment } from 'shared/dtos';
import { useClient, usePayment } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';
import { formatNumberToCurrency } from 'shared/utils';

import { defaultValuesPayment, fieldsPayment, schemaPayment } from '../utils';
import { TextDebit, WrapperDebit } from './styles';

export function RegisterPayment() {
  const { handleSubmit, control, formState, reset } = useForm<IFormPayment>({
    resolver: yupResolver(schemaPayment),
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
    <BaseLayout
      title="Cadastro pagamento"
      renderHeaderRight={<HeaderButtonNav route={RoutesEnum.PAYMENTS} />}
    >
      {loadingClients ? (
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        <CardForm
          loading={loading}
          onSubmit={handleSubmit((data: IFormPayment) => {
            if (clientState) handleSubmitCreate(data, clientState.debit);
            setClientState(null);
          })}
        >
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
        </CardForm>
      )}
    </BaseLayout>
  );
}
