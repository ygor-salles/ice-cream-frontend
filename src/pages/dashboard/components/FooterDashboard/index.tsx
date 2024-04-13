import { FilterAlt } from '@mui/icons-material';

import { ButtonFooter, Footer } from './styles';
import { FooterDashboardProps } from './types';

export function FooterDashboard({
  disabled,
  onClickFilterInput,
  onClickFilterOutput,
}: FooterDashboardProps) {
  return (
    <Footer>
      <ButtonFooter onClick={onClickFilterInput} disabled={disabled}>
        <FilterAlt />
        <span>ENTRADAS</span>
      </ButtonFooter>

      <ButtonFooter onClick={onClickFilterOutput} disabled={disabled}>
        <FilterAlt />
        <span>SAÍDAS</span>
      </ButtonFooter>
    </Footer>
  );
}
