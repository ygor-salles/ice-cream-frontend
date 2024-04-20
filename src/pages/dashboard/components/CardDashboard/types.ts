import { ReactNode } from 'react';

export type TypeCardDash = 'inflows' | 'outflows' | 'profit' | 'debit';

export interface CardDashboardProps {
  type: TypeCardDash;
  dateFormmat: string;
  value: number | null | undefined;
}

export interface DataCardDash {
  title: string;
  bgColor: string | undefined;
  color: string | undefined;
  colorDate: string | undefined;
  colorValue: string | undefined;
  render: ReactNode;
}

export interface CardTotalStyledProps {
  bgColor: string | undefined;
}
