import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionDetails,
  AccordionSummary,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'shared/components/datePicker/DatePicker';
import TextFieldApp from 'shared/components/textField/TextField';
import { IFormFilterSalePage } from 'shared/dtos/ISaleDTO';

import { ContentDate, Form, StyledAccordion, StyledButton } from './styles';
import { defaultValues, fieldSaleFilter } from './utils';

const FilterSale: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control } = useForm<IFormFilterSalePage>({
    defaultValues,
  });
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const onSubmit = (dataForm: IFormFilterSalePage) => console.log('*', dataForm);

  return (
    <StyledAccordion expanded={open} onChange={() => setOpen(!open)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>Filtros</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextFieldApp name={fieldSaleFilter.observation} control={control} label="Observação" />
          <TextFieldApp
            name={fieldSaleFilter.client_name}
            control={control}
            label="Nome do cliente"
          />
          <ContentDate>
            <DatePicker label="Data início" name={fieldSaleFilter.start_date} control={control} />
            <DatePicker label="Data fim" name={fieldSaleFilter.end_date} control={control} />
          </ContentDate>
          <StyledButton loading={false} textButton="Buscar" smDown={smDown} />
        </Form>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default FilterSale;
