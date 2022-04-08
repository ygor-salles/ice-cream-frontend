import { TextField } from '@mui/material';

interface TextFieldAppProps {
  id?: string;
  name?: string;
  label: React.ReactNode;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
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
  type,
  error,
  helperText,
  disabled,
  required,
}: TextFieldAppProps): JSX.Element {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      variant="standard"
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      fullWidth
      autoFocus
    />
  );
}
