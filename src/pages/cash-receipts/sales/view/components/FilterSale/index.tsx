import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AutoComplete, DatePicker, FilterForm, TextFieldApp } from 'shared/components';
import { IFormFilterSalePage } from 'shared/dtos';
import { useDrawerContext } from 'shared/hooks';

import { ContentDate } from './styles';
import { FilterSaleProps } from './types';
import { defaultValues, fieldSaleFilter } from './utils';

export const FilterSale = ({ onSubmitFilter, loadingSales }: FilterSaleProps) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, getValues, setValue, control, reset } = useForm<IFormFilterSalePage>({
    defaultValues,
  });

  const { allClientsStorage } = useDrawerContext();

  const handleReset = () => reset();

  const tooggleFilter = loadingSales ? undefined : () => setOpen(!open);

  const onCloseSelectClient = () => {
    const client_name = getValues('client_name');

    if (client_name && client_name?.length > 0 && allClientsStorage) {
      const client = allClientsStorage.find(item => item.name === client_name);
      if (client?.id) setValue('client_id', client.id.toString());
    } else {
      setValue('client_id', '');
    }
  };

  return (
    <FilterForm
      open={open}
      onReset={handleReset}
      onSubmit={handleSubmit(onSubmitFilter)}
      loadingForm={loadingSales}
      onChange={tooggleFilter}
    >
      <TextFieldApp
        name={fieldSaleFilter.observation}
        control={control}
        label="Observação"
        disabled={loadingSales}
      />
      <AutoComplete
        name={fieldSaleFilter.client_name}
        control={control}
        options={allClientsStorage ?? []}
        sortAlphabeticallyObject
        label="Cliente"
        onClose={onCloseSelectClient}
        disabled={loadingSales}
      />
      <ContentDate>
        <DatePicker
          label="Data início"
          name={fieldSaleFilter.start_date}
          control={control}
          disabled={loadingSales}
        />
        <DatePicker
          label="Data fim"
          name={fieldSaleFilter.end_date}
          control={control}
          disabled={loadingSales}
        />
      </ContentDate>
    </FilterForm>
  );
};
