import { AlertColor, SnackbarCloseReason, SnackbarOrigin, SxProps, Theme } from '@mui/material';

export interface SnackbarProps {
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
