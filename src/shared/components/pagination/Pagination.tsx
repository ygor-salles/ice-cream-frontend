import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PaginationItem, PaginationProps } from '@mui/material';

import { StyledPagination } from './styles';

export function Pagination({ ...props }: PaginationProps) {
  return (
    <StyledPagination
      renderItem={item => (
        <PaginationItem
          components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          {...item}
        />
      )}
      {...props}
      siblingCount={0}
      boundaryCount={1}
    />
  );
}
