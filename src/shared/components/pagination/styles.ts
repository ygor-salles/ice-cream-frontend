import { Pagination } from '@mui/material';
import styled from 'styled-components';

import { Colors } from '../../../styles/global';

export const StyledPagination = styled(Pagination)`
  & .Mui-selected {
    background-color: ${Colors.MAIN_PRIMARY_LIGHT} !important;
    color: ${Colors.WHITE};
  }
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0 16px 0;
`;
