import { FormControl, FormHelperText, InputLabel, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

import { StyledSelect } from './styles';
import { SelectPropsApp } from './types';

export function SelectApp({
  name,
  control,
  options,
  label,
  required,
  disabled,
  setId,
  sortAlphabeticallyObject,
  sortAlphabeticallyString,
  variant = 'standard',
  defaultValue,
  onBlur,
  onClose,
  onChangeStateController,
  ...rest
}: SelectPropsApp) {
  const _renderMenuItem = () => {
    if (sortAlphabeticallyObject) {
      return options
        .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map(item => (
          <MenuItem
            key={item.id ? item.id : item.name}
            value={setId ? item.id : item.name}
            id={setId ? item.id : item.name}
          >
            {item.name}
          </MenuItem>
        ));
    }
    if (sortAlphabeticallyString) {
      return options.sort().map(item => (
        <MenuItem
          key={item.id ? item.id : item.name}
          value={setId ? item.id : item.name}
          id={setId ? item.id : item.name}
        >
          {item.name}
        </MenuItem>
      ));
    }
    return options.map(item => (
      <MenuItem
        key={item.id ? item.id : item.name}
        value={setId ? item.id : item.name}
        id={setId ? item.id : item.name}
      >
        {item.name}
      </MenuItem>
    ));
  };

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl
          fullWidth
          required={required}
          disabled={disabled}
          variant={variant}
          error={!!error}
          {...rest}
        >
          <InputLabel>{label}</InputLabel>
          <StyledSelect
            name={name}
            value={value || ''}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            onClose={onClose}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 400,
                },
              },
            }}
          >
            <MenuItem value="">
              <em>Selecione</em>
            </MenuItem>
            {_renderMenuItem()}
          </StyledSelect>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  ) : (
    <FormControl fullWidth required={required} disabled={disabled} variant="standard" {...rest}>
      <InputLabel>{label}</InputLabel>
      <StyledSelect
        label={label}
        onChange={onChangeStateController}
        defaultValue={defaultValue || ''}
      >
        {!defaultValue && (
          <MenuItem value={defaultValue || ''}>
            <em>Selecione</em>
          </MenuItem>
        )}
        {_renderMenuItem()}
      </StyledSelect>
    </FormControl>
  );
}
