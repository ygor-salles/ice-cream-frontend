import { Card } from '@mui/material';
import { SelectApp } from 'shared/components';
import styled, { css } from 'styled-components';

interface IStyledAccordion {
  open: boolean;
  isMobile?: boolean;
}

interface ICustomSelectApp {
  isMobile?: boolean;
}

export const StyledAccordion = styled(Card).withConfig({
  shouldForwardProp: prop => !['open', 'isMobile'].includes(prop),
})<IStyledAccordion>`
  ${({ open }) =>
    open
      ? css`
          overflow: visible;
          visibility: visible;
          margin-bottom: 25px;
          padding: 15px;
        `
      : css`
          height: 0;
          overflow: hidden;
          visibility: hidden;
          padding: 0 15px;
        `}
  position: relative;
  transition: all 0.4s;

  width: 100%;
  display: flex;
  flex-direction: ${props => (props.isMobile ? 'column' : 'row')};
  align-items: center;
  gap: ${props => (props.isMobile ? '15px' : '30px')};
`;

export const CustomSelectApp = styled(SelectApp).withConfig({
  shouldForwardProp: prop => !['isMobile'].includes(prop),
})<ICustomSelectApp>`
  width: ${props => (props.isMobile ? '100%' : '40%')};
`;
