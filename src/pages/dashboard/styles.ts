import { AttachMoney as MuiAttachMoney } from '@mui/icons-material';
import { Card as MuiCard, Typography } from '@mui/material';
import { ButtonSubmitApp } from 'shared/components';
import styled, { css } from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

interface IStyledAccordion {
  open: boolean;
}

interface CardTotalProps {
  isPositive: boolean;
}

interface TextDateProps {
  isDarkTheme: boolean;
}

export const Accordion = styled(MuiCard).withConfig({
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
          /* transition: margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); */
        `}
  position: relative;
  transition: all 0.4s;

  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;

  ${mediaQuery.tablet} {
    flex-direction: column;
    gap: 15px;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  width: 100%;

  ${mediaQuery.tablet} {
    display: flex;
    flex-direction: column;
  }

  gap: 30px;
  padding-bottom: 16px;
`;

export const Card = styled(MuiCard)`
  padding: 24px;
`;

export const HeaderCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;
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

export const CardTotal = styled(Card).withConfig({
  shouldForwardProp: prop => !['isPositive'].includes(prop),
})<CardTotalProps>`
  padding: 24px;
  background-color: ${props => (props.isPositive ? Colors.GREEN : Colors.RED)};
`;

export const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledButtonSubmitApp = styled(ButtonSubmitApp)`
  margin-top: 15px;
`;

export const TextDate = styled(Typography).withConfig({
  shouldForwardProp: prop => !['isDarkTheme'].includes(prop),
})<TextDateProps>`
  color: ${props => (props.isDarkTheme ? Colors.WHITE : Colors.GRAY)};
`;

export const ContentDate = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

export const CardDebit = styled(Card)`
  padding: 24px;
  background-color: ${Colors.YELLOW_PASTEL};
`;
