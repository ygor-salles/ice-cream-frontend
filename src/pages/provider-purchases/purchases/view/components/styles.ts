import styled, { css } from 'styled-components';
import { Colors } from 'styles/global';

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
  gap: ${props => (!props.isMobile ? '20px' : '5px')};
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
