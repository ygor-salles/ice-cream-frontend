import { Icon } from '@mui/material';
import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

export const ActionContent = styled.div`
  display: flex;
  border-bottom: none;
  justify-content: center;
  align-items: center;

  ${mediaQuery.tableSm} {
    justify-content: space-between;
  }
`;

export const StyledIcon = styled(Icon)`
  cursor: pointer;
  margin-right: 20px;

  ${mediaQuery.tableSm} {
    margin-right: 0;
  }
`;

export const Green = styled.span`
  color: ${Colors.MAIN_SECONDARY};
  font-weight: bold;
`;

export const Red = styled.span`
  color: ${Colors.RED};
  font-weight: bold;
`;
