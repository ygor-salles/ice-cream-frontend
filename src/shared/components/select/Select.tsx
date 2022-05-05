import { Select, FormControl, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';

interface SelectPropsApp {
  required?: boolean;
  error?: boolean;
  label: React.ReactNode;
  name?: string;
  value?: any;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: any[];
}

export default function SelectApp({
  required,
  error,
  label,
  name,
  value,
  onChange,
  array,
}: SelectPropsApp): JSX.Element {
  return (
    <FormControl fullWidth required={required} variant="standard" error={error}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} label={label} onChange={onChange}>
        {array.map(item => (
          <MenuItem key={item.id} value={item}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
