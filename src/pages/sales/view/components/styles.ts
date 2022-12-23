import { Button, Typography } from '@mui/material';
import styled, { css } from 'styled-components';

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
  border-bottom: 1.5px solid rgba(224, 224, 224, 1);
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Text = styled(Typography).withConfig({
  shouldForwardProp: props => !['bold', 'mgTop', 'green'].includes(props),
})<TextProps>`
  font-weight: ${props => (props.bold ? '700' : '400')};
  font-size: 14px;
  margin-top: ${props => props.mgTop && '10px'};
  color: ${props => props.green && '#4caf50'};
  /* color: ${props => props.green && '#33cc95'}; */
`;

export const WrapperNavigate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;

  svg {
    color: rgba(224, 224, 224, 1);
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
  border-bottom: ${props => props.borderBottom && '1px solid rgba(224, 224, 224, 1)'};
`;

export const Title = styled(Typography)`
  font-weight: 700;
  font-size: 22px;
  text-align: center;
`;

export const Value = styled(Typography)`
  font-weight: 700;
  font-size: 18px;
  color: #4caf50;
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
          justify-content: right;
          gap: 10px;
        `}
`;

export const Ul = styled.ul`
  padding-left: 30px;
`;

export const Li = styled.li`
  font-size: 14px;
  color: darkgray;
`;
