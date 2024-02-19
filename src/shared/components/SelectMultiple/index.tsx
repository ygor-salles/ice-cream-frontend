/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useController } from 'react-hook-form';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { SelectMultipleProps } from './types';

export const SelectMultiple = ({
  name,
  control,
  options,
  label,
  required,
  disabled,
  sortAlphabeticallyObject,
  sortAlphabeticallyString,
  onBlur,
  onClose,
  ...rest
}: SelectMultipleProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (event: SelectChangeEvent<any>) => {
    const value = event.target.value as any;

    let duplicateRemoved = [];

    value.forEach((item: any) => {
      if (duplicateRemoved.findIndex(o => o.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter(x => x.id !== item.id);
      } else {
        duplicateRemoved.push(item);
      }
    });

    onChange(duplicateRemoved);
  };

  const _renderMenuItem = () => {
    if (sortAlphabeticallyObject) {
      return options
        .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map(item => (
          <MenuItem key={item.id ?? item.name} value={item}>
            <Checkbox checked={value.findIndex(x => x.id === item.id) >= 0} />
            <ListItemText primary={`${item.name} - ${formatNumberToCurrency(item.price)}`} />
          </MenuItem>
        ));
    }
    if (sortAlphabeticallyString) {
      return options.sort().map(item => (
        <MenuItem key={item.id ?? item.name} value={item}>
          <Checkbox checked={value.findIndex(x => x.id === item.id) >= 0} />
          <ListItemText primary={`${item.name} - ${formatNumberToCurrency(item.price)}`} />
        </MenuItem>
      ));
    }
    return options.map(item => (
      <MenuItem key={item.id ?? item.name} value={item}>
        <Checkbox checked={value.findIndex(x => x.id === item.id) >= 0} />
        <ListItemText primary={`${item.name} - ${formatNumberToCurrency(item.price)}`} />
      </MenuItem>
    ));
  };

  return (
    <FormControl
      fullWidth
      required={required}
      disabled={disabled}
      variant="standard"
      error={!!error}
      {...rest}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        name={name}
        value={value}
        label={label}
        onChange={handleChange}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(item => (
              <Chip key={item.id ?? item.name} label={item.name} />
            ))}
          </Box>
        )}
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
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};
