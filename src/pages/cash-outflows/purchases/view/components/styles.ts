import { Close as MuiClose } from '@mui/icons-material';
import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

interface FormProps {
  smDown?: boolean;
}

interface StyledProps {
  isMobile?: boolean;
  isDarkTheme?: boolean;
}

export const Form = styled.form<FormProps>`
  width: 100%;
  height: ${props => (props.smDown ? '100vh' : 'auto')};
  display: contents;
`;

export const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: row;
  gap: ${props => (!props.isMobile ? '20px' : '10px')};
  padding: ${props => (!props.isMobile ? '16px' : '10px 4px 20px 0')};
`;

export const Image = styled.img<StyledProps>`
  width: ${props => (props.isMobile ? '150px' : '200px')};
  height: ${props => (props.isMobile ? '100px' : '150px')};
  object-fit: cover;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Observation = styled.span<StyledProps>`
  color: ${props => (props.isDarkTheme ? Colors.WHITE : Colors.GRAY)};
  text-align: justify;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WrapperAction = styled.div<StyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${props => (props.isMobile ? '10px' : '40px')};
`;

export const Close = styled(MuiClose)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%);
  background-color: ${Colors.WHITE};

  cursor: pointer;
`;

export const ImgDialog = styled.img`
  width: 600px;
  height: 450px;

  ${mediaQuery.mobile} {
    width: auto;
    height: auto;
    object-fit: cover;
  }
`;
