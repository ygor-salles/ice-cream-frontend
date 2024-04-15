import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AutoComplete, DatePicker, FilterForm, TextFieldApp } from 'shared/components';
import { IFormFilterPaymentPage } from 'shared/dtos';
import { useClient, useDrawerContext } from 'shared/hooks';

import { ContentDate } from './styles';
import { FilterPaymentProps } from './types';
import { defaultValues, fieldPaymentFilter } from './utils';

export const FilterPayment = ({ onSubmitFilter, loadingPayments }: FilterPaymentProps) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, getValues, setValue, control, reset } = useForm<IFormFilterPaymentPage>({
    defaultValues,
  });

  const { allClientsStorage } = useDrawerContext();
  const { allClients, getClients, loadingClients } = useClient();

  const onCloseSelectClient = () => {
    const client_name = getValues('client_name');

    if (client_name?.length > 0 && allClientsStorage) {
      const client = allClientsStorage.find(item => item.name === client_name);

      if (client?.id) setValue('client_id', client.id.toString());
    } else if (client_name?.length > 0 && allClients.length > 0) {
      const client = allClients.find(item => item.name === client_name);

      if (client?.id) setValue('client_id', client.id.toString());
    } else {
      setValue('client_id', '');
    }
  };

  const handleOpenAccordion = async () => {
    if (!open && !allClientsStorage) {
      await getClients();
    }

    setOpen(!open);
  };

  return (
    <FilterForm
      loadingForm={loadingPayments}
      onChange={loadingPayments ? undefined : handleOpenAccordion}
      onReset={() => reset()}
      onSubmit={handleSubmit(onSubmitFilter)}
      open={open}
      loadingExpanded={loadingClients}
    >
      <TextFieldApp
        name={fieldPaymentFilter.observation}
        control={control}
        label="Observação"
        disabled={loadingPayments}
      />
      <AutoComplete
        name={fieldPaymentFilter.client_name}
        control={control}
        options={allClientsStorage ?? allClients}
        sortAlphabeticallyObject
        label="Cliente"
        onClose={onCloseSelectClient}
        disabled={loadingPayments}
      />
      <ContentDate>
        <DatePicker
          label="Data início"
          name={fieldPaymentFilter.start_date}
          control={control}
          disabled={loadingPayments}
        />
        <DatePicker
          label="Data fim"
          name={fieldPaymentFilter.end_date}
          control={control}
          disabled={loadingPayments}
        />
      </ContentDate>
    </FilterForm>
  );
};
