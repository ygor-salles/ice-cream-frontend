import { ExpandMore } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary, CircularProgress, Typography } from '@mui/material';

import { ButtonSubmit } from '../ButtonSubmit';
import { Form, StyledAccordion, StyledButton, Wrapper } from './styles';
import { FilterFormProps } from './types';

export function FilterForm({
  children,
  loadingForm,
  onChange,
  onReset,
  onSubmit,
  open,
  loadingExpanded = false,
}: FilterFormProps) {
  return (
    <StyledAccordion expanded={open} onChange={onChange}>
      <AccordionSummary
        expandIcon={loadingExpanded ? <CircularProgress size={16} disableShrink /> : <ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>Filtros</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form onSubmit={onSubmit}>
          {children}
          <Wrapper>
            <StyledButton variant="outlined" disabled={loadingForm} type="button" onClick={onReset}>
              Limpar
            </StyledButton>
            <ButtonSubmit loading={loadingForm}>Buscar</ButtonSubmit>
          </Wrapper>
        </Form>
      </AccordionDetails>
    </StyledAccordion>
  );
}
