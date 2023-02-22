import providerImage from 'assets/provider.svg';
import purchaseImage from 'assets/purchase.svg';
import { useNavigate } from 'react-router-dom';
import SplashScreen from 'shared/components/splashScreen/SplashScreen';
import { RoutesEnum } from 'shared/constants/routesList';
import { LayoutBaseDePagina } from 'shared/layouts';

export function CashOutflows() {
  const navigate = useNavigate();

  return (
    <LayoutBaseDePagina titulo="Saídas">
      <SplashScreen
        description=""
        cardsList={[
          {
            title: 'Tela de fornecedores/funcionários',
            description:
              'Cadastre novos funcionários ou fornecedores para utilização de compras de produtos ou pagamento de funcionários',
            srcImage: providerImage,
            altImage: 'fornecedores',
            onNavigate: () => navigate(RoutesEnum.PROVIDERS),
          },
          {
            title: 'Tela de compras/folha de pagamento',
            description:
              'Cadastre as compras realizadas para o estoque de produtos do seu negócio ou pagamento dos funcionários',
            srcImage: purchaseImage,
            altImage: 'compras',
            onNavigate: () => navigate(RoutesEnum.PURCHASES),
          },
        ]}
      />
    </LayoutBaseDePagina>
  );
}
