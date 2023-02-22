/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export interface TypeDefaultOptions {
  id: number;
  name: string;
}

interface SelectPropsApp {
  name: string;
  control: Control<any>;
  options: any[];
  label: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  setId?: boolean;
  sortAlphabeticallyObject?: boolean;
  sortAlphabeticallyString?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
  onChangeStateController?: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}

export default function SelectApp({
  name,
  control,
  options,
  label,
  required,
  disabled,
  setId,
  sortAlphabeticallyObject,
  sortAlphabeticallyString,
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
          variant="standard"
          error={!!error}
          {...rest}
        >
          <InputLabel>{label}</InputLabel>
          <Select
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
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  ) : (
    <FormControl fullWidth required={required} disabled={disabled} variant="standard" {...rest}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} onChange={onChangeStateController} defaultValue="">
        <MenuItem value="">
          <em>Selecione</em>
        </MenuItem>
        {_renderMenuItem()}
      </Select>
    </FormControl>
  );
}
