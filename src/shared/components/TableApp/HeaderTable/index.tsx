import { useState } from 'react';
import { TextFieldApp } from 'shared/components';

import { StyledAccordion, CustomSelectApp } from './styles';
import { HeaderTableProps } from './types';

export const HeaderTable = ({
  open,
  renderInputSearchAndSelect,
  handleSearch,
  isMobile,
  ...rest
}: HeaderTableProps) => {
  const defaultValue = renderInputSearchAndSelect ? renderInputSearchAndSelect[0].placeholder : '';

  const [searchSelectState, setSearchSelectState] = useState(defaultValue);

  return renderInputSearchAndSelect ? (
    <StyledAccordion open={!!open} isMobile={isMobile} {...rest}>
      <CustomSelectApp
        name=""
        control={undefined}
        options={renderInputSearchAndSelect?.map(item => ({
          name: item.placeholder,
        }))}
        label="Selecione coluna de busca"
        onChangeStateController={e => {
          setSearchSelectState(e.target.value as string);
        }}
        required
        defaultValue={defaultValue}
        isMobile={isMobile}
      />
      <TextFieldApp
        name=""
        control={undefined}
        label={`Pesquisar ${searchSelectState}`}
        handleSearch={value => {
          const objInputSearch = renderInputSearchAndSelect?.filter(
            item => item.placeholder === searchSelectState,
          );

          handleSearch(value, objInputSearch[0].searchPropertName, objInputSearch[0].type);
        }}
        disabled={!searchSelectState.length}
      />
    </StyledAccordion>
  ) : null;
};
