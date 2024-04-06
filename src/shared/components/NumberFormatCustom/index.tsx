import React from 'react';
import NumberFormat from 'react-number-format';

import { CustomProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function currencyFormatter(value: any): string {
  if (!Number(value)) return '';

  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);

  return `${amount}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NumberFormatCustom = React.forwardRef<NumberFormat<any>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        format={currencyFormatter}
        prefix="$"
      />
    );
  },
);
