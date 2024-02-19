import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

import { StyledIcon, StyledListItemText } from './styles';
import { ListItemLinkProps } from './types';

export const ListItemLink = ({ icon, label, onClick, to, loadingDataState }: ListItemLinkProps) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = !loadingDataState
    ? () => {
        navigate(to);
        onClick?.();
      }
    : undefined;

  return (
    <ListItemButton disabled={loadingDataState} selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <StyledIcon>{icon}</StyledIcon>
      </ListItemIcon>
      <ListItemText primary={label} primaryTypographyProps={StyledListItemText} />
    </ListItemButton>
  );
};
