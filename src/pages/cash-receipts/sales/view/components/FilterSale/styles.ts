import { Accordion } from '@mui/material';
import styled from 'styled-components';

export const StyledAccordion = styled(Accordion)`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  margin-bottom: 20px;

  width: 100%;
`;

export const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContentDate = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  margin-top: 16px;

  button,
  div {
    margin: 0;
  }
`;
