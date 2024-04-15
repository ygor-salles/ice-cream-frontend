import { Card } from '@mui/material';
import { SelectApp } from 'shared/components';
import styled, { css } from 'styled-components';
import { mediaQuery } from 'styles/global';

interface IStyledAccordion {
  open: boolean;
}

export const StyledAccordion = styled(Card).withConfig({
  shouldForwardProp: prop => !['open'].includes(prop),
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
  align-items: center;
  flex-direction: row;
  gap: 30px;

  ${mediaQuery.mobile} {
    flex-direction: column;
    gap: 15px;
  }
`;

export const CustomSelectApp = styled(SelectApp)`
  width: 40%;

  ${mediaQuery.mobile} {
    width: 100%;
  }
`;
