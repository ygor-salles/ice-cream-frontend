import closingBoxImage from 'assets/closing-box.svg';
import customerCreamImage from 'assets/customer.svg';
import paymentImage from 'assets/payment.svg';
import salesImage from 'assets/sales.svg';
import { useNavigate } from 'react-router-dom';
import SplashScreen from 'shared/components/splashScreen/SplashScreen';
import { RoutesEnum } from 'shared/constants/routesList';
import { LayoutBaseDePagina } from 'shared/layouts';

export function CashReceipts() {
  const navigate = useNavigate();

  return (
    <LayoutBaseDePagina titulo="Entradas">
      <SplashScreen
        description=""
        cardsList={[
          {
            title: 'Tela de clientes',
            description: 'Cadastre novos clientes para ter controle sobre vendas a prazo',
            srcImage: customerCreamImage,
            altImage: 'clientes',
            onNavigate: () => navigate(RoutesEnum.CLIENTS),
          },
          {
            title: 'Tela de pagamentos',
            description:
              'Cadastre os pagamentos dos clientes referente as dívidas que possuem com seu negócio',
            srcImage: paymentImage,
            altImage: 'pagamentos',
            onNavigate: () => navigate(RoutesEnum.PAYMENTS),
          },
          {
            title: 'Tela de vendas',
            description: 'Cadastre suas vendas ao decorrer do dia',
            srcImage: salesImage,
            altImage: 'vendas',
            onNavigate: () => navigate(RoutesEnum.SALES_CREATE),
          },
          {
            title: 'Fechamento diário',
            description: 'Cadastre suas vendas que ocorreram no dia (somente no final do dia)',
            srcImage: closingBoxImage,
            altImage: 'fechamento de caixa',
            onNavigate: () => navigate(RoutesEnum.SALES_CREATE),
          },
        ]}
      />
    </LayoutBaseDePagina>
  );
}
