/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */

import formatDate from '../../utils/formatDate';
import { formatNumberToCurrency } from '../../utils/formatNumberToCurrency';

/* eslint-disable react/jsx-no-bind */
export const _renderBasicTextCell = (value: string) => <span>{value || '--'}</span>;

export const _renderBasicToCurrency = (value: number) => (
  <span>{formatNumberToCurrency(value)}</span>
);

export const _renderBasicDate = (value: string | Date) => (
  <span>{formatDate(new Date(value)) || '00/00/0000'}</span>
);
