import { ArrowForward } from '@mui/icons-material';
import { useThemeContext } from 'shared/hooks/useThemeContext';

import {
  Container,
  Description,
  StyledCard,
  TitleCard,
  WrapperNav,
  ContentCards,
  Image,
  DescriptionCard,
  ContentDescription,
} from './styles';
import { SplashScreenProps } from './types';

export const SplashScreen = ({ description, cardsList, ...props }: SplashScreenProps) => {
  const { themeName } = useThemeContext();

  return (
    <Container {...props}>
      <Description isDarkTheme={themeName === 'dark'}>{description}</Description>
      <ContentCards>
        {cardsList.map(item => (
          <StyledCard key={item.title} onClick={item.onNavigate}>
            <Image src={item.srcImage} alt={item.altImage} />
            <ContentDescription>
              <TitleCard>{item.title}</TitleCard>
              <WrapperNav>
                <DescriptionCard isDarkTheme={themeName === 'dark'}>
                  {item.description}
                </DescriptionCard>
                <ArrowForward color="primary" />
              </WrapperNav>
            </ContentDescription>
          </StyledCard>
        ))}
      </ContentCards>
    </Container>
  );
};
