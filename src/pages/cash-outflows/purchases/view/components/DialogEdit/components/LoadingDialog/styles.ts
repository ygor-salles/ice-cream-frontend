import { Skeleton } from '@mui/material';
import styled, { css } from 'styled-components';
import { mediaQuery } from 'styles/global';

interface StyledSkeletonProps {
  halfTheWidth?: boolean;
}

export const StyledSkeleton = styled(Skeleton).withConfig({
  shouldForwardProp: props => !['halfTheWidth'].includes(props),
})<StyledSkeletonProps>`
  padding-top: 20px;
  height: 42px;

  ${({ halfTheWidth }) =>
    halfTheWidth
      ? css`
          width: 270px;

          ${mediaQuery.mobile} {
            width: 45%;
          }
        `
      : css`
          ${mediaQuery.mobile} {
            width: 100%;
          }
        `}
`;
