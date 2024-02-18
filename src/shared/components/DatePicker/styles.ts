import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Input = styled(TextField)`
  width: 100%;

  input[type='date']:in-range::-webkit-datetime-edit-year-field,
  input[type='date']:in-range::-webkit-datetime-edit-month-field,
  input[type='date']:in-range::-webkit-datetime-edit-day-field,
  input[type='date']:in-range::-webkit-datetime-edit-text {
    color: transparent;
  }
`;
