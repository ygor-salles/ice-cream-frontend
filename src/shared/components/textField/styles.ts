import { LocalPhone, PhoneAndroid } from '@mui/icons-material';
import { TextField } from '@mui/material';
import styled from 'styled-components';

import { useAppThemeContext } from '../../contexts';

export const StyledTextField = styled(TextField)(() => ({
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

export const StyledPhoneAndroid = styled(PhoneAndroid)`
  cursor: pointer;
`;

export const StyledLocalPhone = styled(LocalPhone)`
  cursor: pointer;
`;
