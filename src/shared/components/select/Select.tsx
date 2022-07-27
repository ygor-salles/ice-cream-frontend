/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface SelectPropsApp {
  name: string;
  control: Control<any>;
  array: any[];
  label: React.ReactNode;
  required?: boolean;
  setId?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default function SelectApp({
  name,
  control,
  array,
  label,
  required,
  setId,
  onBlur,
  onClose,
}: SelectPropsApp): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth required={required} variant="standard" error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select
            name={name}
            value={value}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            onClose={onClose}
          >
            {array.map(item => (
              <MenuItem
                key={item.id}
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
  );
}
