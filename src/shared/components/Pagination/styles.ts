import { Pagination } from '@mui/material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

export const StyledPagination = styled(Pagination)`
  & .Mui-selected {
    background-color: ${Colors.MAIN_PRIMARY_LIGHT} !important;
    color: ${Colors.WHITE};
  }
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0 16px 0;

  button {
    min-width: 40px;
    height: 40px;
    border-radius: 20px;
    font-size: 1rem;
  }
`;
