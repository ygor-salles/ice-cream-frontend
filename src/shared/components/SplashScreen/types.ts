export interface SplashScreenProps {
  description: string;
  cardsList: Array<{
    title: string;
    description: string;
    srcImage: string;
    altImage: string;
    onNavigate: () => void;
  }>;
}
