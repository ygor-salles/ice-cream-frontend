import { Button, Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

interface TextProps {
  bold?: boolean;
  mgTop?: boolean;
  green?: boolean;
}

interface RowProps {
  alignCenter?: boolean;
}

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  border-bottom: 1.9px solid ${Colors.GRAY_LIGHT};
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Text = styled(Typography).withConfig({
  shouldForwardProp: props => !['bold', 'mgTop', 'green'].includes(props),
})<TextProps>`
  font-weight: ${props => (props.bold ? '600' : '400')};
  margin-top: ${props => props.mgTop && '10px'};
  color: ${props => props.green && Colors.MAIN_SECONDARY};
`;

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ alignCenter }) =>
    alignCenter &&
    css`
      align-items: center;
    `}
`;

export const TextCustom = styled.span`
  font-weight: 400;
  color: ${Colors.LIGHT_PRIMARY_LIGHT};
  flex: 1;
  flex-wrap: wrap;

  ${mediaQuery.tableSm} {
    width: 350px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  ${mediaQuery.mobile} {
    width: 250px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const WrapperNavigate = styled.div`
  svg {
    color: ${Colors.GRAY};
    font-size: 800;
  }
`;

// ---------------

export const Title = styled(Typography)`
  font-weight: 600;
  font-size: 22px !important;
  text-align: center;
  margin-bottom: 8px;
`;

export const Value = styled(Typography)`
  font-weight: 600;
  font-size: 18px !important;
  color: ${Colors.MAIN_SECONDARY};
`;

export const StyledButton = styled(Button)`
  margin-bottom: 15px;
`;

export const FooterDetail = styled.div<{ isMobile?: boolean }>`
  width: 100%;
  display: flex;

  ${({ isMobile }) =>
    isMobile
      ? css`
          flex-direction: column;
          bottom: 0;
          position: fixed;
          padding: 15px;
        `
      : css`
          margin-top: 150px;
          justify-content: right;
          gap: 10px;
        `}
`;

export const Ul = styled.ul`
  padding-left: 30px;
`;

export const Li = styled.li`
  color: ${Colors.GRAY};
`;

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

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
