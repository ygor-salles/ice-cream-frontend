import { Card } from '@mui/material';
import styled from 'styled-components';

import { Colors } from '../../../styles/global';

export const Form = styled.form`
  margin-top: 8px;
  width: 100%;
`;

export const StyledCard = styled(Card)`
  padding: 20px;
`;

export const GridForm = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 30px;
`;

export const WrapperDebit = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;

export const TextDebit = styled.span`
  color: ${Colors.RED};
  font-weight: bold;
`;
