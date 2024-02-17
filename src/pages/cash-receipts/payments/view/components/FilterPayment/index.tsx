import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AutoComplete from 'shared/components/autocomplete/Autocomplete';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import DatePicker from 'shared/components/datePicker/DatePicker';
import TextFieldApp from 'shared/components/textField/TextField';
import { IFormFilterPaymentPage } from 'shared/dtos/IPaymentDTO';
import { useDrawerContext } from 'shared/hooks/useDrawerContext';

import { ContentDate, Form, StyledAccordion, Wrapper } from './styles';
import { defaultValues, fieldPaymentFilter } from './utils';

interface PropTypes {
  loadingPayments: boolean;
  onSubmitFilter: (dataForm: IFormFilterPaymentPage) => Promise<void>;
}

const FilterPayment: React.FC<PropTypes> = ({ onSubmitFilter, loadingPayments }) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, getValues, setValue, control, reset } = useForm<IFormFilterPaymentPage>({
    defaultValues,
  });
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { allClientsStorage } = useDrawerContext();

  const onCloseSelectClient = () => {
    const client_name = getValues('client_name');

    if (client_name?.length > 0 && allClientsStorage) {
      const client = allClientsStorage.find(item => item.name === client_name);
      setValue('client_id', client.id.toString());
    } else {
      setValue('client_id', '');
    }
  };

  return (
    <StyledAccordion expanded={open} onChange={loadingPayments ? undefined : () => setOpen(!open)}>
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
            name={fieldPaymentFilter.observation}
            control={control}
            label="Observação"
            disabled={loadingPayments}
          />
          <AutoComplete
            name={fieldPaymentFilter.client_name}
            control={control}
            options={allClientsStorage ?? []}
            sortAlphabeticallyObject
            label="Cliente"
            onClose={onCloseSelectClient}
            disabled={loadingPayments}
          />
          <ContentDate>
            <DatePicker
              label="Data início"
              name={fieldPaymentFilter.start_date}
              control={control}
              disabled={loadingPayments}
            />
            <DatePicker
              label="Data fim"
              name={fieldPaymentFilter.end_date}
              control={control}
              disabled={loadingPayments}
            />
          </ContentDate>
          <Wrapper>
            <Button
              variant="outlined"
              disabled={loadingPayments}
              type="button"
              onClick={() => reset()}
            >
              Limpar
            </Button>
            <ButtonSubmitApp loading={loadingPayments} textButton="Buscar" smDown={smDown} />
          </Wrapper>
        </Form>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default FilterPayment;
