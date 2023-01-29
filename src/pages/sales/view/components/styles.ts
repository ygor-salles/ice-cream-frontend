import { Button, Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import { Colors } from 'styles/global';

interface TextProps {
  bold?: boolean;
  mgTop?: boolean;
  green?: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  border-bottom: 1.5px solid ${Colors.GRAY_LIGHT};
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
  /* color: ${props => props.green && Colors.GREEN}; */
`;

export const WrapperNavigate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;

  svg {
    color: ${Colors.GRAY};
    font-size: 800;
  }
`;

// ---------------

export const WrapperDetail = styled.div<{ borderBottom?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  width: 100%;
  padding: 15px 0;
  border-bottom: ${props => props.borderBottom && `1px solid ${Colors.GRAY}`};
`;

export const Title = styled(Typography)`
  font-weight: 600;
  font-size: 22px !important;
  text-align: center;
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
  color: ${Colors.DARKGRAY};
`;
