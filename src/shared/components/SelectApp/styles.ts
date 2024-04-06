import { Select } from '@mui/material';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  input {
    :disabled {
      opacity: 0;
    }
  }
`;
