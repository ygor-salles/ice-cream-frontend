import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import { useState } from 'react';

import SelectApp from '../select/Select';
import TextFieldApp from '../textField/TextField';
import { ContentFilter, CustomAccordion } from './styles';
import { IRenderInputSearch, TypeColumnTableEnum } from './types';

interface HeaderTableProps {
  renderInputSearchAndSelect?: IRenderInputSearch[];
  handleSearch: (
    value: string,
    searchPropertName: string,
    type: keyof typeof TypeColumnTableEnum,
  ) => void;
}

const HeaderTable: React.FC<HeaderTableProps> = ({ renderInputSearchAndSelect, handleSearch }) => {
  const [searchSelectState, setSearchSelectState] = useState('');

  return (
    <CustomAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Filtros</AccordionSummary>
      <AccordionDetails>
        <ContentFilter>
          <SelectApp
            name=""
            control={undefined}
            array={renderInputSearchAndSelect.map(item => ({
              name: item.placeholder,
            }))}
            label="Selecione coluna de busca"
            onChangeStateController={e => {
              setSearchSelectState(e.target.value as string);
            }}
            required
          />
          <TextFieldApp
            name=""
            control={undefined}
            label={`Pesquisar ${searchSelectState}`}
            handleSearch={value => {
              const objInputSearch = renderInputSearchAndSelect.filter(
                item => item.placeholder === searchSelectState,
              );

              handleSearch(value, objInputSearch[0].searchPropertName, objInputSearch[0].type);
            }}
            disabled={!searchSelectState.length}
          />
        </ContentFilter>
      </AccordionDetails>
    </CustomAccordion>
  );
};

export default HeaderTable;
