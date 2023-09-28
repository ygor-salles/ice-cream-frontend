import { useState } from 'react';

import TextFieldApp from '../textField/TextField';
import { StyledAccordion, CustomSelectApp } from './styles';
import { IRenderInputSearch, TypeColumnTableEnum } from './types';

interface HeaderTableProps {
  open?: boolean;
  renderInputSearchAndSelect?: IRenderInputSearch[];
  handleSearch: (
    value: string,
    searchPropertName: string,
    type: keyof typeof TypeColumnTableEnum,
  ) => void;
  isMobile: boolean;
}

const HeaderTable: React.FC<HeaderTableProps> = ({
  open,
  renderInputSearchAndSelect,
  handleSearch,
  isMobile,
  ...rest
}) => {
  const defaultValue = renderInputSearchAndSelect[0].placeholder;

  const [searchSelectState, setSearchSelectState] = useState(defaultValue);

  return renderInputSearchAndSelect ? (
    <StyledAccordion open={open} isMobile={isMobile} {...rest}>
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

export default HeaderTable;
