import { ArrowBack } from '@mui/icons-material';
import { Button, Theme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { HeaderButtonNavProps } from './types';

export function HeaderButtonNav({
  disabled,
  route,
  icon = <ArrowBack />,
  textButton,
  onClick,
}: HeaderButtonNavProps) {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  return (
    <Button
      variant={smDown ? 'outlined' : 'contained'}
      color={smDown ? 'info' : 'primary'}
      startIcon={icon === null ? null : icon}
      onClick={route ? () => navigate(route) : onClick}
      disabled={disabled}
    >
      {textButton ?? 'Voltar'}
    </Button>
  );
}
