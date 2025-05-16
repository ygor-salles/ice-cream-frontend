import { FilterAlt, Refresh } from '@mui/icons-material';
import { Button, Theme, useMediaQuery } from '@mui/material';

import { RightHeaderProps } from './types';

export function RightHeader({
  disabled,
  onClickFilter,
  onClickRefresh,
  onClickRoolback,
}: RightHeaderProps) {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (smDown) {
    return (
      <Button color="info" variant="outlined" disabled={disabled} onClick={onClickRoolback}>
        DESFAZER
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<FilterAlt />}
        onClick={onClickFilter}
        disabled={disabled}
      >
        FILTRAR
      </Button>
      <Button
        variant="contained"
        startIcon={<Refresh />}
        color="primary"
        onClick={onClickRefresh}
        // disabled={disabled}
        disabled
      >
        ATUALIZAR
      </Button>
    </>
  );
}
