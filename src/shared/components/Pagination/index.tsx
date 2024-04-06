import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { PaginationItem, PaginationProps } from '@mui/material';

import { StyledPagination } from './styles';

export function Pagination({ ...props }: PaginationProps) {
  return (
    <StyledPagination
      renderItem={item => (
        <PaginationItem components={{ previous: ArrowBack, next: ArrowForward }} {...item} />
      )}
      {...props}
      siblingCount={0}
      boundaryCount={1}
    />
  );
}
