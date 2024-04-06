export interface ListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  loadingDataState: boolean;
  onClick: (() => void) | undefined;
}
