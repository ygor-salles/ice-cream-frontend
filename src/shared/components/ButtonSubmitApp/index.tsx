import { Button, CircularProgress } from '@mui/material';

import { ContentButton } from './styles';
import { IButtonSubmitAppProps } from './types';

export const ButtonSubmitApp = ({
  loading,
  smDown,
  textButton,
  disabled,
  ...props
}: IButtonSubmitAppProps) =>
  smDown !== undefined ? (
    <ContentButton {...props}>
      <Button
        type="submit"
        variant="contained"
        fullWidth={!!smDown}
        endIcon={loading && <CircularProgress variant="indeterminate" color="inherit" size={20} />}
        disabled={loading || disabled}
      >
        {textButton}
      </Button>
    </ContentButton>
  ) : (
    <Button
      variant="contained"
      type="submit"
      endIcon={loading && <CircularProgress variant="indeterminate" color="inherit" size={20} />}
      disabled={loading || disabled}
    >
      {textButton}
    </Button>
  );
