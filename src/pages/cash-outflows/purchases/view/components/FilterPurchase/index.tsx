import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AutoComplete, DatePicker, FilterForm, TextFieldApp } from 'shared/components';
import { IFormFilterPurchasePage } from 'shared/dtos';
import { useProvider } from 'shared/hooks';

import { ContentDate } from './styles';
import { FilterPurchaseProps } from './types';
import { defaultValues, fieldPurchaseFilter } from './utils';

export const FilterPurchase = ({ onSubmitFilter, loadingPurchases }: FilterPurchaseProps) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, getValues, setValue, control, reset } = useForm<IFormFilterPurchasePage>({
    defaultValues,
  });

  const { allProviders, getProviders, loadingProviders } = useProvider();

  const onCloseSelectProvider = () => {
    const provider_name = getValues('provider_name');

    if (provider_name?.length > 0 && allProviders) {
      const provider = allProviders.find(item => item.name === provider_name);
      if (provider?.id) setValue('provider_id', provider.id.toString());
    } else {
      setValue('provider_id', '');
    }
  };

  const handleOpenAccordion = async () => {
    if (!open) {
      await getProviders();
    }

    setOpen(!open);
  };

  return (
    <FilterForm
      loadingForm={loadingPurchases}
      onChange={loadingPurchases ? undefined : handleOpenAccordion}
      onReset={() => reset()}
      onSubmit={handleSubmit(onSubmitFilter)}
      open={open}
      loadingExpanded={loadingProviders}
    >
      <TextFieldApp
        name={fieldPurchaseFilter.observation}
        control={control}
        label="Observação"
        disabled={loadingPurchases}
      />
      <AutoComplete
        name={fieldPurchaseFilter.provider_name}
        control={control}
        options={allProviders ?? []}
        sortAlphabeticallyObject
        label="Fornecedor"
        onClose={onCloseSelectProvider}
        disabled={loadingPurchases}
      />
      <ContentDate>
        <DatePicker
          label="Data início"
          name={fieldPurchaseFilter.start_date}
          control={control}
          disabled={loadingPurchases}
        />
        <DatePicker
          label="Data fim"
          name={fieldPurchaseFilter.end_date}
          control={control}
          disabled={loadingPurchases}
        />
      </ContentDate>
    </FilterForm>
  );
};
