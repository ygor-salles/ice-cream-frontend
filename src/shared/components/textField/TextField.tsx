import { InputProps, TextField } from '@mui/material';
import styled from 'styled-components';

import { useAppThemeContext } from '../../contexts';

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

const StyledTextField = styled(TextField)(() => ({
  '& label.Mui-focused': {
    color: useAppThemeContext().themeName === 'dark' ? 'white' : 'auto',
  },
  '& .css-1u4qbjr-MuiInputBase-root-MuiInput-root:after': {
    borderBottom: useAppThemeContext().themeName === 'dark' ? 'white' : 'auto',
  },
  // '& .MuiOutlinedInput-root': {
  //   '&.Mui-focused fieldset': {
  //     borderBottom: useAppThemeContext().themeName === 'dark' ? 'white' : 'auto',
  //   },
  // },
}));

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
    <StyledTextField
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
