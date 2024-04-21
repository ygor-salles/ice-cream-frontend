export interface DialogAppProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit?: (id: number) => void;
  id?: number;
  title: string;
  text: string;
  loading?: boolean;
}
