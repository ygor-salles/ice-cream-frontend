import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material';

interface SelectPropsApp {
  required?: boolean;
  error?: boolean;
  label: React.ReactNode;
  name?: string;
  value?: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: any[];
  setId?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  helperText?: string;
}

export default function SelectApp({
  required,
  error,
  label,
  name,
  value,
  onChange,
  array,
  setId,
  onBlur,
  helperText,
}: SelectPropsApp): JSX.Element {
  return (
    <FormControl fullWidth required={required} variant="standard" error={error}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} label={label} onChange={onChange} onBlur={onBlur}>
        {array.map(item => (
          <MenuItem key={item.id} value={setId ? item.id : item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
