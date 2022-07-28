import { InputProps, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';

import { useAppThemeContext } from '../../contexts';

interface TextFieldPropsApp {
  name: string;
  control: Control<any>;
  label: React.ReactNode;
  mask?: (value: string) => string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  inputMode?: 'email' | 'search' | 'tel' | 'text' | 'url' | 'none' | 'numeric' | 'decimal';
  InputProps?: Partial<InputProps>;
  disabled?: boolean;
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
  name,
  control,
  label,
  mask,
  type,
  required,
  inputMode,
  InputProps,
  disabled,
}: TextFieldPropsApp): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <StyledTextField
          label={label}
          value={mask ? mask(value) : value || ''}
          onChange={onChange}
          InputProps={InputProps}
          variant="standard"
          type={type}
          inputMode={inputMode}
          error={!!error}
          helperText={error ? error.message : null}
          required={required}
          fullWidth
          autoFocus
          disabled={disabled}
        />
      )}
    />
  );
}
