import { FilterAlt, Refresh } from '@mui/icons-material';

import { ButtonFooter, Footer } from './styles';
import { FooterOrdersProps } from './types';

export function FooterOrders({ disabled, onClickFilter, onClickRefresh }: FooterOrdersProps) {
  return (
    <Footer>
      <ButtonFooter onClick={onClickRefresh} disabled={disabled}>
        <Refresh />
        <span>ATUALIZAR</span>
      </ButtonFooter>

      <ButtonFooter onClick={onClickFilter} disabled={disabled}>
        <FilterAlt />
        <span>FILTRAR</span>
      </ButtonFooter>
    </Footer>
  );
}
