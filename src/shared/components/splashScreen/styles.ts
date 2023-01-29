import { Card, Typography } from '@mui/material';
import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

interface DescriptionCardProps {
  isDarkTheme: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;

  ${mediaQuery.tablet} {
    margin-bottom: 60px;
  }
`;

export const Image = styled.img`
  height: 250px;
`;

export const Description = styled(Typography)`
  font-size: 32px;
  font-weight: 400;
`;

export const ContentCards = styled.div`
  display: grid;
  gap: 60px;
  grid-template-columns: auto auto auto;

  ${mediaQuery.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const TitleCard = styled(Typography)`
  font-weight: 500;
  font-size: 20px;
  color: ${Colors.MAIN_PRIMARY_LIGHT};
`;

export const ContentDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
  border-top: solid 1px ${Colors.GRAY_LIGHT};
`;

export const DescriptionCard = styled(Typography).withConfig({
  shouldForwardProp: props => !['isDarkTheme'].includes(props),
})<DescriptionCardProps>`
  font-weight: 300;
  font-size: 14px !important;
  color: ${props => (props.isDarkTheme ? Colors.WHITE : Colors.GRAY)};
`;

export const WrapperNav = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
`;
