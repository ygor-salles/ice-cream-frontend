import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AutoComplete from 'shared/components/autocomplete/Autocomplete';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import DatePicker from 'shared/components/datePicker/DatePicker';
import TextFieldApp from 'shared/components/textField/TextField';
import { localStorageKeys } from 'shared/constants/localStorageKeys';
import { IClientDTO } from 'shared/dtos/IClientDTO';
import { IFormFilterSalePage } from 'shared/dtos/ISaleDTO';
import { useCache } from 'shared/hooks/useCache';

import { ContentDate, Form, StyledAccordion, Wrapper } from './styles';
import { defaultValues, fieldSaleFilter } from './utils';

interface PropTypes {
  loadingSales: boolean;
  onSubmitFilter: (dataForm: IFormFilterSalePage) => Promise<void>;
}

const FilterSale: React.FC<PropTypes> = ({ onSubmitFilter, loadingSales }) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, getValues, setValue, control, reset } = useForm<IFormFilterSalePage>({
    defaultValues,
  });
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { getDataLocalStorage } = useCache();

  const [allClients, setAllClients] = useState<IClientDTO[]>([]);

  const onCloseSelectClient = () => {
    const client_name = getValues('client_name');

    if (client_name?.length > 0) {
      const client = allClients.find(item => item.name === client_name);
      setValue('client_id', client.id.toString());
    } else {
      setValue('client_id', '');
    }
  };

  useEffect(() => {
    const clientsStorage: IClientDTO[] = getDataLocalStorage(localStorageKeys.CLIENTS);

    setAllClients(clientsStorage);
  }, []);

  return (
    <StyledAccordion expanded={open} onChange={loadingSales ? undefined : () => setOpen(!open)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>Filtros</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form onSubmit={handleSubmit(onSubmitFilter)}>
          <TextFieldApp
            name={fieldSaleFilter.observation}
            control={control}
            label="Observação"
            disabled={loadingSales}
          />
          <AutoComplete
            name={fieldSaleFilter.client_name}
            control={control}
            options={allClients}
            sortAlphabeticallyObject
            label="Cliente"
            onClose={onCloseSelectClient}
            disabled={loadingSales}
          />
          <ContentDate>
            <DatePicker
              label="Data início"
              name={fieldSaleFilter.start_date}
              control={control}
              disabled={loadingSales}
            />
            <DatePicker
              label="Data fim"
              name={fieldSaleFilter.end_date}
              control={control}
              disabled={loadingSales}
            />
          </ContentDate>
          <Wrapper>
            <Button
              variant="outlined"
              disabled={loadingSales}
              type="button"
              onClick={() => reset()}
            >
              Limpar
            </Button>
            <ButtonSubmitApp loading={loadingSales} textButton="Buscar" smDown={smDown} />
          </Wrapper>
        </Form>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default FilterSale;
