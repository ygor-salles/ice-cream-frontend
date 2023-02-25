import styled from 'styled-components';
import { Colors } from 'styles/global';

export const Ul = styled.ul`
  padding-left: 30px;
`;

export const Li = styled.li<{ hasCombinations?: boolean }>`
  color: ${props => (props.hasCombinations ? Colors.MAIN_PRIMARY_LIGHT : Colors.DARKGRAY)};
`;
