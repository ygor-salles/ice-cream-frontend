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
  margin: 10px 0;
  border-bottom: 1px solid #dedede;
`;

export const Li = styled.li<{ hasCombinations?: boolean }>`
  color: ${props => (props.hasCombinations ? Colors.MAIN_PRIMARY_LIGHT : Colors.DARKGRAY)};
  font-size: large;
`;

export const Text = styled(Typography)`
  font-size: 16px !important;
  font-weight: 400 !important;
  margin-left: 10px;
`;
