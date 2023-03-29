import { Typography } from '@mui/material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

interface UlProps {
  hasBoder?: boolean;
}

export const Container = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Ul = styled.ul<UlProps>`
  padding-left: 30px;
  margin: 10px 0;
  border-bottom: ${props => props.hasBoder && `1px solid ${Colors.GRAY_LIGHT}`};
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
