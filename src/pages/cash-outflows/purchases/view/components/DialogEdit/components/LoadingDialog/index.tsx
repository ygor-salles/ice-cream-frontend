import { Grid } from '@mui/material';

import { StyledSkeleton } from './styles';

export function LoadingDialog() {
  return (
    <>
      <Grid item xs={12}>
        <StyledSkeleton variant="rectangular" />
      </Grid>
      <Grid item xs={12}>
        <StyledSkeleton variant="rectangular" />
      </Grid>
      <Grid item xs={12}>
        <StyledSkeleton variant="rectangular" />
      </Grid>
      <Grid item xs={12}>
        <StyledSkeleton variant="rectangular" halfTheWidth />
      </Grid>
      <Grid item xs={12}>
        <StyledSkeleton variant="rectangular" halfTheWidth />
      </Grid>
    </>
  );
}
