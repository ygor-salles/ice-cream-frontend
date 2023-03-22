/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, AutocompleteCloseReason, TextField } from '@mui/material';
import { useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';

interface PropTypes {
  name: string;
  control: Control<any>;
  options: any[];
  label: string;
  required?: boolean;
  disabled?: boolean;
  sortAlphabeticallyObject?: boolean;
  onClose?: (event: React.SyntheticEvent<Element, Event>, reason: AutocompleteCloseReason) => void;
}

const AutoComplete: React.FC<PropTypes> = ({
  control,
  label,
  name,
  options,
  disabled,
  required,
  sortAlphabeticallyObject,
  onClose,
}) => {
  const sortedOptions = useMemo(() => {
    const opt = sortAlphabeticallyObject
      ? options
          .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
          .map(item => item.name)
      : options.map(item => item.name);

    opt.unshift('');

    return opt;
  }, [options]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          options={sortedOptions}
          value={value ?? ''}
          onChange={(_, newValue: any) => onChange(newValue ?? '')}
          onClose={onClose}
          disabled={disabled}
          renderInput={params => (
            <TextField
              {...params}
              required={required}
              variant="standard"
              label={label}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          ListboxProps={{
            sx: {
              maxHeight: 400,
            },
          }}
        />
      )}
    />
  );
};

export default AutoComplete;
