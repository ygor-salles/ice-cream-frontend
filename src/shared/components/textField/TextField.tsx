import { TextField } from '@mui/material';

interface TextFieldPropsApp {
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
}: TextFieldPropsApp): JSX.Element {
  return (
    <TextField
      name={name}
      label={label}
      type={type}
      inputMode={inputMode}
      value={mask ? mask(value) : value || ''}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      variant="standard"
      fullWidth
      autoFocus
    />
  );
}
