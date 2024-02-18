import { Button, CircularProgress } from '@mui/material';

import { ContentButton } from './styles';

interface IButtonSubmitAppProps {
  loading: boolean;
  smDown?: boolean;
  textButton: string;
  disabled?: boolean;
}

export const ButtonSubmitApp: React.FC<IButtonSubmitAppProps> = ({
  loading,
  smDown,
  textButton,
  disabled,
  ...props
}) =>
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
