import { ArrowForward } from '@mui/icons-material';
import { useAppThemeContext } from 'shared/contexts';

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

interface PropTypes {
  description: string;
  cardsList: Array<{
    title: string;
    description: string;
    srcImage: string;
    altImage: string;
    onNavigate: () => void;
  }>;
}

const SplashScreen: React.FC<PropTypes> = ({ description, cardsList, ...props }) => {
  const { themeName } = useAppThemeContext();

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

export default SplashScreen;
