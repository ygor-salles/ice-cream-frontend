import { TypeDefaultOptions } from 'shared/components/SelectApp';
import { EnumTypeProvider } from 'shared/dtos/IProviderDTO';

export const LISTTYPEPROVIDER: TypeDefaultOptions[] = [
  {
    id: 1,
    name: EnumTypeProvider.PROVIDER,
  },
  {
    id: 2,
    name: EnumTypeProvider.EMPLOYEE,
  },
  {
    id: 3,
    name: EnumTypeProvider.OTHER,
  },
];
