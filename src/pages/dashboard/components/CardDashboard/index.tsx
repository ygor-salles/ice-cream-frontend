import { Typography } from '@mui/material';
import { images } from 'assets';
import { useThemeContext } from 'shared/hooks';
import { formatNumberToCurrency } from 'shared/utils';
import { Colors } from 'styles/global';

import { Card, HeaderCard, Img, AttachMoney } from './styles';
import { CardDashboardProps, DataCardDash, TypeCardDash } from './types';

export function CardDashboard({ type, dateFormmat, value }: CardDashboardProps) {
  const { themeName } = useThemeContext();
  const isPositive = Boolean(
    type === 'profit' && value !== undefined && value !== null && value >= 0,
  );

  const obj: Record<TypeCardDash, DataCardDash> = {
    inflows: {
      title: 'Entradas',
      render: <Img src={images.entradas} alt="entradas" />,
      bgColor: undefined,
      color: Colors.GREEN,
      colorDate: themeName === 'dark' ? Colors.WHITE : Colors.GRAY,
      colorValue: undefined,
    },
    outflows: {
      title: 'Saídas',
      render: <Img src={images.saidas} alt="saídas" />,
      bgColor: undefined,
      color: Colors.RED,
      colorDate: themeName === 'dark' ? Colors.WHITE : Colors.GRAY,
      colorValue: undefined,
    },
    profit: {
      title: 'Lucro',
      render: <AttachMoney />,
      bgColor: isPositive ? Colors.GREEN : Colors.RED,
      color: Colors.WHITE,
      colorDate: Colors.WHITE,
      colorValue: Colors.WHITE,
    },
    debit: {
      title: 'Dívida dos clientes',
      render: <Img src={images.entradas} alt="entradas" />,
      bgColor: Colors.YELLOW_PASTEL,
      color: 'InfoText',
      colorDate: undefined,
      colorValue: 'InfoText',
    },
  };

  return (
    <Card bgColor={obj[type].bgColor}>
      <HeaderCard>
        <div>
          <Typography variant="h6" color={obj[type].color}>
            {obj[type].title}
          </Typography>
          {type !== 'debit' && <Typography color={obj[type].colorDate}>{dateFormmat}</Typography>}
        </div>

        {obj[type].render}
      </HeaderCard>

      <Typography variant="h4" color={obj[type].colorValue}>
        {formatNumberToCurrency(value ?? 0)}
      </Typography>
    </Card>
  );
}
