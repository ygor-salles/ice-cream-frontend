import { AddBox, ArrowBack, FilterAlt } from '@mui/icons-material';
import { Button, Theme, useMediaQuery } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants';

interface RightHeaderProps {
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export function RightHeader({ disabled, onClick }: RightHeaderProps) {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const navigateCashRecipiets = () => navigate(RoutesEnum.INFLOWS);
  const navigateClientsCreate = () => navigate(RoutesEnum.CLIENTS_CREATE);

  if (smDown) {
    return (
      <Button
        color="info"
        variant="outlined"
        startIcon={<ArrowBack />}
        disabled={disabled}
        onClick={navigateCashRecipiets}
      >
        VOLTAR
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<FilterAlt />}
        onClick={onClick}
        disabled={disabled}
      >
        FILTRAR
      </Button>
      <Button
        variant="contained"
        startIcon={<AddBox />}
        color="primary"
        onClick={navigateClientsCreate}
        disabled={disabled}
      >
        CADASTRAR
      </Button>
    </>
  );
}
