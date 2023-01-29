import customerCreamImage from 'assets/customer.svg';
import paymentImage from 'assets/payment.svg';
import { useNavigate } from 'react-router-dom';
import SplashScreen from 'shared/components/splashScreen/SplashScreen';
import { RoutesEnum } from 'shared/constants/routesList';
import { LayoutBaseDePagina } from 'shared/layouts';

export function ClientPayment() {
  const navigate = useNavigate();

  return (
    <LayoutBaseDePagina titulo="Clientes">
      <SplashScreen
        description="Gerencie informações dos clientes, os seus dados como nome, telefone e sua atual dívida. Efetue também o processo de pagamento do cliente para abatimento da dívida com seu negócio"
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
        ]}
      />
    </LayoutBaseDePagina>
  );
}
