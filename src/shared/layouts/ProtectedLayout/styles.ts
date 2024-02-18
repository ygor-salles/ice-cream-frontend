import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

export const HeaderUnauth = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.MAIN_PRIMARY_LIGHT};
  padding: 16px;
  top: 0;
`;

export const ImgUnauthorized = styled.img`
  display: block;
  margin: 0 auto;
  width: 600px;

  ${mediaQuery.tablet} {
    width: 300px;
    height: 400px;
    margin-top: 50%;
  }
`;

export const WrapperUnauth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
