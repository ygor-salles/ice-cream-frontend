import styled from 'styled-components';
import { mediaQuery } from 'styles/global';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;

  ${mediaQuery.desktop} {
    justify-content: center;
  }
`;
