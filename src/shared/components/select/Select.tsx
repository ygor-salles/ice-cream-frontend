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

interface SelectPropsApp {
  name: string;
  control: Control<any>;
  array: any[];
  label: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  setId?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
  onChangeStateController?: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}

export default function SelectApp({
  name,
  control,
  array,
  label,
  required,
  disabled,
  setId,
  onBlur,
  onClose,
  onChangeStateController,
  ...rest
}: SelectPropsApp) {
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
            value={value}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            onClose={onClose}
          >
            <MenuItem value="">
              <em>Selecione</em>
            </MenuItem>
            {array.map(item => (
              <MenuItem
                key={item.id ? item.id : item.name}
                value={setId ? item.id : item.name}
                id={setId ? item.id : item.name}
              >
                {item.name}
              </MenuItem>
            ))}
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
        {array.map(item => (
          <MenuItem
            key={item.id ? item.id : item.name}
            value={setId ? item.id : item.name}
            id={setId ? item.id : item.name}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
