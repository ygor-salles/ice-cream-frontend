export interface DialogAppProps {
  smDown?: boolean;
  open: boolean;
  handleClose: () => void;
  handleSubmit?: (id: number) => void;
  id?: number;
  textButtonClose: string;
  textButtonSubmit: string;
  title: string;
  text: string;
  loading?: boolean;
}
