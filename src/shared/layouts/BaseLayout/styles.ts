import { Typography } from '@mui/material';
import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

interface WrapperProps {
  gap?: boolean;
}

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 64px;

  margin: 0 16px 0 16px;
  border-bottom: 1px solid rgba(224, 224, 224, 1);

  ${mediaQuery.mobile} {
    margin: 0;
    padding: 8px;
    background-color: #9c27b0;
    border-bottom: none;
  }
`;

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  gap: ${props => props.gap && '20px'};

  ${mediaQuery.tabletMd} {
    gap: 8px;
  }
  ${mediaQuery.mobile} {
    gap: 0;
  }
`;

export const Title = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${mediaQuery.tabletMd} {
    font-size: 1.8rem;
  }
  ${mediaQuery.mobile} {
    color: ${Colors.WHITE};
    font-size: 1.25rem;
  }
`;

export const Main = styled.main`
  flex: 1;
  overflow: auto;
  padding: 14px 16px;
  margin: 2px 0;
`;
