import { Accordion } from '@mui/material';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
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

export const StyledButton = styled(ButtonSubmitApp)`
  margin-top: 15px;
`;
