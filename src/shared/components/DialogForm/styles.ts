import styled from 'styled-components';
import { mediaQuery } from 'styles/global';

export const Form = styled.form`
  width: 100%;
  height: auto;
  display: contents;

  ${mediaQuery.mobile} {
    height: 100vh;
  }
`;
