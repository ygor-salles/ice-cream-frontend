import { TextField, TextFieldProps } from '@mui/material';

// const StyledTextField = styled(MuiTextField)(({ inputProps }: any) => ({
//   '& label.Mui-focused': {
//     color: inputProps.labelcolor || colors.primary.dark,
//   },
//   '& .MuiOutlinedInput-root': {
//     '&.Mui-focused fieldset': {
//       borderColor: inputProps.bordercolor || colors.primary.dark,
//     },
//   },

//   ...inputProps.customstyles,
// }));

export default function TextFieldApp({ ...props }: TextFieldProps): JSX.Element {
  return (
    <TextField
      variant={props.variant || 'standard'}
      fullWidth={props.fullWidth || true}
      autoFocus={props.autoFocus || true}
      {...props}
    />
  );
}
