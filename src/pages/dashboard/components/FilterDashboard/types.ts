import { IFormFilterDashboard, IProviderDTO } from 'shared/dtos';

export interface FilterDashboardProps {
  allProviders: IProviderDTO[];
  loading: boolean;
  disabled: boolean;
  onSubmitFilter: (data: IFormFilterDashboard) => void;
}
