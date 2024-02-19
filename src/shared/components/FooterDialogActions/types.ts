export interface FooterDialogActionsProps {
  textButtonCancel: string;
  textButtonConfirm: string;
  onClose: () => void;
  loading: boolean;
  isDialogDelete?: boolean;
  onSubmitDelete?: (id: number) => void;
  id?: number;
}
