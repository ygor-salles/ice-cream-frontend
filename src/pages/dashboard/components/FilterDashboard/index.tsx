import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValuesFilterDash, fieldsFilterDash, schemaFilterDash } from 'pages/dashboard/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker, FilterForm, SelectApp } from 'shared/components';
import { LISTTYPEPROVIDER, LISTTYPESALES } from 'shared/constants';
import { EnumTypeProvider, IFormFilterDashboard } from 'shared/dtos';

import { ContentDate } from './styles';
import { FilterDashboardProps } from './types';

export function FilterDashboard(props: FilterDashboardProps) {
  const { allProviders, disabled, loading, onSubmitFilter } = props;

  const isDisabled = disabled || loading;

  const { handleSubmit, control, watch, reset } = useForm<IFormFilterDashboard>({
    resolver: yupResolver(schemaFilterDash),
    defaultValues: defaultValuesFilterDash,
  });

  const its_ice_cream_shoop = watch('its_ice_cream_shoop');

  const [openState, setOpenState] = useState(false);

  const objLiteral: Record<EnumTypeProvider, string> = {
    'Fornecedor da sorveteria': 'Fornecedor',
    'Funcionário da sorveteria': 'Funcionário',
    'Outro(não relacionado a sorveteria)': 'Outro',
  };

  return (
    <FilterForm
      loadingForm={loading}
      onSubmit={handleSubmit(onSubmitFilter)}
      onReset={() => reset()}
      onChange={() => setOpenState(prev => !prev)}
      open={openState}
      loadingExpanded={loading}
      disabled={isDisabled}
    >
      <ContentDate>
        <DatePicker
          label="Data início"
          name={fieldsFilterDash.START_DATE}
          control={control}
          disabled={isDisabled}
        />
        <DatePicker
          label="Data fim"
          name={fieldsFilterDash.END_DATE}
          control={control}
          disabled={isDisabled}
        />
      </ContentDate>

      <SelectApp
        name={fieldsFilterDash.ITS_ICE_CREAM_SHOOP}
        control={control}
        options={LISTTYPEPROVIDER}
        label="Tipo de fornecedor"
        disabled={isDisabled}
      />
      {its_ice_cream_shoop && (
        <SelectApp
          name={fieldsFilterDash.PROVIDER_ID}
          control={control}
          options={allProviders}
          setId
          sortAlphabeticallyObject
          label={objLiteral[its_ice_cream_shoop as EnumTypeProvider]}
          required={its_ice_cream_shoop === EnumTypeProvider.EMPLOYEE}
          disabled={isDisabled}
        />
      )}

      <SelectApp
        name={fieldsFilterDash.TYPE_SALE}
        control={control}
        options={LISTTYPESALES}
        label="Tipo de venda"
        disabled={isDisabled}
      />
    </FilterForm>
  );
}
