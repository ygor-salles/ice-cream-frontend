import providerImage from 'assets/provider.svg';
import purchaseImage from 'assets/purchase.svg';
import { useNavigate } from 'react-router-dom';
import SplashScreen from 'shared/components/splashScreen/SplashScreen';
import { RoutesEnum } from 'shared/constants/routesList';
import { LayoutBaseDePagina } from 'shared/layouts';

export function ProviderPurchase() {
  const navigate = useNavigate();

  return (
    <LayoutBaseDePagina titulo="Fornecedores">
      <SplashScreen
        description="Gerencie informações dos fornecedores, os seus dados como nome e telefone. Efetue também o processo de compra de produtos para seu negócio"
        cardsList={[
          {
            title: 'Tela de fornecedores',
            description: 'Cadastre novos fornecedores para utilização de compras de produtos',
            srcImage: providerImage,
            altImage: 'fornecedores',
            onNavigate: () => navigate(RoutesEnum.PROVIDERS),
          },
          {
            title: 'Tela de compras',
            description: 'Cadastre as compras realizadas para o estoque de produtos do seu negócio',
            srcImage: purchaseImage,
            altImage: 'compras',
            onNavigate: () => navigate(RoutesEnum.PURCHASES),
          },
        ]}
      />
    </LayoutBaseDePagina>
  );
}
