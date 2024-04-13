import { FilterAlt } from '@mui/icons-material';
import { Button, Theme, useMediaQuery } from '@mui/material';

import { RightHeaderProps } from './types';

export function RightHeader({
  disabled,
  onClickFilterInput,
  onClickFilterOutput,
}: RightHeaderProps) {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (smDown) return null;

  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<FilterAlt />}
        onClick={onClickFilterOutput}
        disabled={disabled}
      >
        SAÍDAS
      </Button>
      <Button
        variant="contained"
        startIcon={<FilterAlt />}
        color="success"
        onClick={onClickFilterInput}
        disabled={disabled}
      >
        ENTRADAS
      </Button>
    </>
  );
}
