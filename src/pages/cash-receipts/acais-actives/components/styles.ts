import { Typography } from '@mui/material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

export const Container = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Ul = styled.ul`
  padding-left: 30px;
  margin-bottom: 10px;
`;

export const Li = styled.li<{ hasCombinations?: boolean }>`
  color: ${props => (props.hasCombinations ? Colors.MAIN_PRIMARY_LIGHT : Colors.DARKGRAY)};
`;

export const Text = styled(Typography)`
  font-size: 14px !important;
  font-weight: 400 !important;
  margin-left: 10px;
`;
