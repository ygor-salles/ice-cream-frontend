import { Alert, Snackbar as MuiSnackBar } from '@mui/material';

import { SnackbarProps } from './types';

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
  return (
    <MuiSnackBar
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
    </MuiSnackBar>
  );
}
