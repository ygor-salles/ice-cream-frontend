import { Button, CircularProgress } from '@mui/material';

import { ContentButton } from './styles';

interface IButtonSubmitAppProps {
  loading: boolean;
  smDown: boolean;
  textButton: string;
}

const ButtonSubmitApp: React.FC<IButtonSubmitAppProps> = ({ loading, smDown, textButton }) => {
  return (
    <ContentButton>
      <Button
        type="submit"
        variant="contained"
        fullWidth={!!smDown}
        endIcon={loading && <CircularProgress variant="indeterminate" color="inherit" size={20} />}
        disabled={loading}
      >
        {textButton}
      </Button>
    </ContentButton>
  );
};

export default ButtonSubmitApp;
