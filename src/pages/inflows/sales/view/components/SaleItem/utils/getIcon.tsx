import { CircularProgress, Icon } from '@mui/material';

import { WrapperIcons } from '../styles';

interface IGetIconProps {
  hasAcai: boolean;
  in_progress: boolean;
  isPaid: boolean;
}

export function getIcon({ hasAcai, in_progress, isPaid }: IGetIconProps) {
  if (hasAcai) {
    if (!in_progress && !isPaid) return <Icon color="warning">done</Icon>;

    if (in_progress && isPaid) {
      return (
        <WrapperIcons>
          <Icon color="success">done</Icon>
          <CircularProgress size={16} disableShrink />
        </WrapperIcons>
      );
    }

    if (in_progress && !isPaid) {
      return <CircularProgress size={16} disableShrink />;
    }

    return <Icon color="success">done_all</Icon>;
  }

  return isPaid ? <Icon color="success">done_all</Icon> : <Icon color="warning">done</Icon>;
}
