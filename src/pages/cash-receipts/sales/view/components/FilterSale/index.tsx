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
import SelectApp from 'shared/components/select/Select';
import { LISTTYPESALES } from 'shared/constants/listTypeSales';

import { StyledAccordion, Form, StyledButton } from './styles';

interface IForm {
  date: string;
  type_sale: string;
}

const FilterSale: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control } = useForm<IForm>({
    defaultValues: { date: '', type_sale: '' },
  });
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const onSubmit = (dataForm: IForm) => console.log('*', dataForm);

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
          <TextFieldApp name={fieldsSale.OBSERVATION} control={control} label="Observação" />
          <DatePicker label="Data" name="date" control={control} />
          <SelectApp
            name="type_sale"
            control={control}
            options={LISTTYPESALES}
            label="Tipo de venda"
          />
          <StyledButton loading={false} textButton="Buscar" smDown={smDown} />
        </Form>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default FilterSale;
