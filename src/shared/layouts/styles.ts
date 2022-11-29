import { Typography } from '@mui/material';
import styled from 'styled-components';

interface HeaderProps {
  smDown?: boolean;
  mdDown?: boolean;
}

interface TitleProps {
  smDown?: boolean;
}

interface WrapperProps {
  gap?: boolean;
}

export const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Header = styled.header<HeaderProps>`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  /* height: ${props => (props.smDown ? '64px' : props.mdDown ? '64px' : '96px')}; */
  height: 64px;
  margin: ${props => (props.smDown ? '0' : '0 20px 0 20px')};
  background-color: ${props => props.smDown && '#9c27b0'};

  border-bottom: ${props => !props.smDown && '1px solid rgba(224, 224, 224, 1)'};
`;

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  gap: ${props => props.gap && '20px'};
`;

export const Title = styled(Typography).withConfig({
  shouldForwardProp: prop => !['smDown'].includes(prop),
})<TitleProps>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.smDown && '#fff'};
`;

export const Divider = styled.hr`
  flex: 1;
  height: 1px;
  background-color: rgba(224, 224, 224, 1);
`;

export const Section = styled.section`
  flex: 1;
  overflow: auto;
  padding-bottom: 8px;
`;

export const ContentChildren = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  background-color: #9c27b0;
`;

export const ButtonFooter = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;

  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
`;
