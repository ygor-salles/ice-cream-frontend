import styled from 'styled-components';
import { Colors } from 'styles/global';

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
