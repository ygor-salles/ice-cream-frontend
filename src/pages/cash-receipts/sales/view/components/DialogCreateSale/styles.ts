import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

export const Form = styled.form`
  width: 100%;
  height: auto;
  padding: 24px;
  overflow: auto;

  ${mediaQuery.tableSm} {
    height: 100vh;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const GridForm = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 30px;

  width: 530px;

  ${mediaQuery.tableSm} {
    width: auto;
  }
`;

export const WrapperButtons = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin-top: 40px;

  ${mediaQuery.tableSm} {
    left: 24px;
    bottom: 16px;
  }

  ${mediaQuery.mobile} {
    flex-direction: column;

    button {
      width: 100%;
    }

    button:first-child {
      margin-bottom: 16px;
    }
  }
`;

export const HeaderDialog = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${Colors.MAIN_PRIMARY_LIGHT};
`;
