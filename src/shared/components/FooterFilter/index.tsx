import { AddBox, FilterAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { ButtonFooter, Footer } from './styles';
import { FooterFilterProps } from './types';

export function FooterFilter({ disabled, onClickFilter, route }: FooterFilterProps) {
  const navigate = useNavigate();

  const navigatePage = () => navigate(route);

  return (
    <Footer>
      <ButtonFooter onClick={navigatePage} disabled={disabled}>
        <AddBox />
        <span>CADASTRAR</span>
      </ButtonFooter>

      <ButtonFooter onClick={onClickFilter} disabled={disabled}>
        <FilterAlt />
        <span>FILTRAR</span>
      </ButtonFooter>
    </Footer>
  );
}
