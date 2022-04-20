import { InputProps, TextField } from '@mui/material';

interface TextFieldPropsApp {
  id?: string;
  name?: string;
  label: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  mask?: (value: string) => string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  inputMode?: 'email' | 'search' | 'tel' | 'text' | 'url' | 'none' | 'numeric' | 'decimal';
  InputProps?: Partial<InputProps>;
}

// const StyledTextField = styled(MuiTextField)(({ inputProps }: any) => ({
//   '& label.Mui-focused': {
//     color: inputProps.labelcolor || colors.primary.dark,
//   },
//   '& .MuiOutlinedInput-root': {
//     '&.Mui-focused fieldset': {
//       borderColor: inputProps.bordercolor || colors.primary.dark,
//     },
//   },

//   ...inputProps.customstyles,
// }));

export default function TextFieldApp({
  id,
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  mask,
  type,
  required,
  inputMode,
  InputProps,
}: TextFieldPropsApp): JSX.Element {
  return (
    <TextField
      label={label}
      value={mask ? mask(value) : value || ''}
      onChange={onChange}
      name={name}
      id={id}
      InputProps={InputProps}
      variant="standard"
      type={type}
      inputMode={inputMode}
      error={error}
      helperText={helperText}
      required={required}
      fullWidth
      autoFocus
    />
  );
}
