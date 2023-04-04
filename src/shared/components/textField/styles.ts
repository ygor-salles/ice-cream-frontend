import { LocalPhone, PhoneAndroid } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { useThemeContext } from 'shared/hooks/useThemeContext';
import styled from 'styled-components';
import { Colors } from 'styles/global';

export const StyledTextField = styled(TextField)(() => ({
  '& label.Mui-focused': {
    color: useThemeContext().themeName === 'dark' ? Colors.WHITE : 'auto',
  },
  '& .css-1u4qbjr-MuiInputBase-root-MuiInput-root:after': {
    borderBottom: useThemeContext().themeName === 'dark' ? Colors.WHITE : 'auto',
  },
}));

export const StyledPhoneAndroid = styled(PhoneAndroid)`
  cursor: pointer;
`;

export const StyledLocalPhone = styled(LocalPhone)`
  cursor: pointer;
`;
