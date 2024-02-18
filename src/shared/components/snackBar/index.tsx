import {
  Alert,
  AlertColor,
  Snackbar as MuiSnackBar,
  SnackbarCloseReason,
  SnackbarOrigin,
} from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';

interface SnackbarProps {
  open?: boolean;
  autoHideDuration?: number;
  onCloseSnack?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason,
  ) => void;
  onCloseAlert?: (event: React.SyntheticEvent<Element, Event>) => void;
  message?: React.ReactNode;
  action?: React.ReactNode;
  severity?: AlertColor;
  sx?: SxProps<Theme>;
  anchorOrigin?: SnackbarOrigin;
}

export function Snackbar({
  action,
  autoHideDuration = 3000,
  message,
  onCloseSnack,
  onCloseAlert,
  open,
  severity,
  sx = { width: '350px', position: 'absolute', marginTop: '150px' },
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
}: SnackbarProps) {
  const StyledSnackbar = styled(MuiSnackBar)(() => ({}));

  return (
    <StyledSnackbar
      action={action}
      autoHideDuration={autoHideDuration}
      message={message}
      onClose={onCloseSnack}
      open={open}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={onCloseAlert} severity={severity} sx={sx}>
        {message || ''}
      </Alert>
    </StyledSnackbar>
  );
}
