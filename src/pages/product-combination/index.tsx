import combinationsImage from 'assets/combinations.svg';
import iceCreamImage from 'assets/ice-cream.svg';
import { useNavigate } from 'react-router-dom';
import SplashScreen from 'shared/components/splashScreen/SplashScreen';
import { RoutesEnum } from 'shared/constants/routesList';
import { LayoutBaseDePagina } from 'shared/layouts';

export function ProductCombination() {
  const navigate = useNavigate();

  return (
    <LayoutBaseDePagina titulo="Produtos">
      <SplashScreen
        description="Gerencie informações do estoque de produtos e as respectivas combinações dos produtos. Como por exemplo, combinações de açaís"
        cardsList={[
          {
            title: 'Tela de produtos',
            description:
              'Cadastre seus produtos e genrencie quais produtos possui em estoque ou não',
            srcImage: iceCreamImage,
            altImage: 'sorvete',
            onNavigate: () => navigate(RoutesEnum.PRODUCTS),
          },
          {
            title: 'Tela de combinações',
            description:
              'Cadastre suas combinações referente aos produtos e genrencie quais combinações possui em estoque ou não',
            srcImage: combinationsImage,
            altImage: 'combinações',
            onNavigate: () => navigate(RoutesEnum.COMBINATIONS),
          },
        ]}
      />
    </LayoutBaseDePagina>
  );
}
