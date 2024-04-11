import { Button, CircularProgress, Theme, useMediaQuery } from '@mui/material';

import { ContentButton } from './styles';
import { IButtonSubmitProps } from './types';

export const ButtonSubmit = ({ loading, children, disabled, ...props }: IButtonSubmitProps) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <ContentButton {...props}>
      <Button
        type="submit"
        variant="contained"
        fullWidth={!!smDown}
        endIcon={loading && <CircularProgress variant="indeterminate" color="inherit" size={20} />}
        disabled={loading || disabled}
      >
        {children}
      </Button>
    </ContentButton>
  );
};
