import { AttachMoney as MuiAttachMoney } from '@mui/icons-material';
import { Card as MuiCard } from '@mui/material';
import styled, { css } from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

import { CardTotalStyledProps } from './types';

export const Card = styled(MuiCard).withConfig({
  shouldForwardProp: prop => !['bgColor'].includes(prop),
})<CardTotalStyledProps>`
  width: 400px;
  height: 180px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ bgColor }) =>
    bgColor &&
    css`
      background-color: ${bgColor};
    `}

  ${mediaQuery.mobile} {
    width: 100%;
  }
`;

export const HeaderCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
`;

export const AttachMoney = styled(MuiAttachMoney)`
  width: 25px;
  height: 25px;
  color: ${Colors.WHITE};
`;
