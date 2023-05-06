import { Typography } from '@mui/material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

import CartListing from '../register/components/CartListing';

interface TextProps {
  bold?: boolean;
  mgTop?: boolean;
  green?: boolean;
}

export const WrapperDetail = styled.div<{ borderBottom?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  width: 100%;
  padding: 15px 0;
  border-bottom: ${props => props.borderBottom && `1px solid ${Colors.GRAY}`};
  border-top: solid 1px ${Colors.GRAY_LIGHT};
`;

export const Text = styled(Typography).withConfig({
  shouldForwardProp: props => !['bold', 'mgTop', 'green'].includes(props),
})<TextProps>`
  font-weight: ${props => (props.bold ? '600' : '400')};
  margin-top: ${props => props.mgTop && '10px'};
  color: ${props => props.green && Colors.MAIN_SECONDARY};
`;

export const StyledCardList = styled(CartListing)`
  width: 100%;
  margin-top: 10px;
  height: calc(100vh - 135px);
`;
