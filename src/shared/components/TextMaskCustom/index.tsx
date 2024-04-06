import * as React from 'react';
import { IMaskInput } from 'react-imask';

import { CustomProps } from './types';

export const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(
  props,
  ref,
) {
  const { onChange, mask, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={{
        '#': /[1-9]/,
      }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      inputRef={ref}
      onAccept={(value: unknown) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
