import { ExpandMore } from '@mui/icons-material';
import {
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
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
import { IFormFilterPurchasePage } from 'shared/dtos/IPurchaseDTO';
import { useProvider } from 'shared/hooks/network/useProvider';

import { ContentDate, Form, StyledAccordion, Wrapper } from './styles';
import { defaultValues, fieldPurchaseFilter } from './utils';

interface PropTypes {
  loadingPurchases: boolean;
  onSubmitFilter: (dataForm: IFormFilterPurchasePage) => Promise<void>;
}

const FilterPurchase: React.FC<PropTypes> = ({ onSubmitFilter, loadingPurchases }) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, getValues, setValue, control, reset } = useForm<IFormFilterPurchasePage>({
    defaultValues,
  });
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { allProviders, getProviders, loadingProviders } = useProvider();

  const onCloseSelectProvider = () => {
    const provider_name = getValues('provider_name');

    if (provider_name?.length > 0 && allProviders) {
      const provider = allProviders.find(item => item.name === provider_name);
      setValue('provider_id', provider.id.toString());
    } else {
      setValue('provider_id', '');
    }
  };

  const handleOpenAccordion = async () => {
    if (!open) {
      await getProviders();
    }

    setOpen(!open);
  };

  return (
    <StyledAccordion expanded={open} onChange={loadingPurchases ? undefined : handleOpenAccordion}>
      <AccordionSummary
        expandIcon={
          loadingProviders ? <CircularProgress size={16} disableShrink /> : <ExpandMore />
        }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>Filtros</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form onSubmit={handleSubmit(onSubmitFilter)}>
          <TextFieldApp
            name={fieldPurchaseFilter.observation}
            control={control}
            label="Observação"
            disabled={loadingPurchases}
          />
          <AutoComplete
            name={fieldPurchaseFilter.provider_name}
            control={control}
            options={allProviders ?? []}
            sortAlphabeticallyObject
            label="Fornecedor"
            onClose={onCloseSelectProvider}
            disabled={loadingPurchases}
          />
          <ContentDate>
            <DatePicker
              label="Data início"
              name={fieldPurchaseFilter.start_date}
              control={control}
              disabled={loadingPurchases}
            />
            <DatePicker
              label="Data fim"
              name={fieldPurchaseFilter.end_date}
              control={control}
              disabled={loadingPurchases}
            />
          </ContentDate>
          <Wrapper>
            <Button
              variant="outlined"
              disabled={loadingPurchases}
              type="button"
              onClick={() => reset()}
            >
              Limpar
            </Button>
            <ButtonSubmitApp loading={loadingPurchases} textButton="Buscar" smDown={smDown} />
          </Wrapper>
        </Form>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default FilterPurchase;
