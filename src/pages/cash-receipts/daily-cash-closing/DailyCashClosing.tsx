import { yupResolver } from '@hookform/resolvers/yup';
import { AttachMoney } from '@mui/icons-material';
import { Skeleton, Theme, Typography, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import DatePicker from 'shared/components/datePicker/DatePicker';
import TextFieldApp from 'shared/components/textField/TextField';
import { RoutesEnum } from 'shared/constants/routesList';
import {
  defaultValuesCashClosing,
  fieldsSale,
  IFormCashClosing,
  schemaCreateCashClosing,
} from 'shared/dtos/ISaleDTO';
import { useSale } from 'shared/hooks/network/useSale';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function DailyCashClosing() {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmitCreateCashClosing, loadingForm } = useSale();

  const { handleSubmit, control, reset } = useForm<IFormCashClosing>({
    resolver: yupResolver(schemaCreateCashClosing),
    defaultValues: defaultValuesCashClosing,
  });

  return (
    <LayoutBaseDePagina
      titulo="Fechamento caixa"
      navigatePage={RoutesEnum.SALES}
      textButton="VENDAS"
      icon={<AttachMoney />}
    >
      {loadingForm ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <Form
          noValidate
          onSubmit={handleSubmit((data: IFormCashClosing) =>
            handleSubmitCreateCashClosing(data, reset),
          )}
        >
          <StyledCard>
            <GridForm>
              <TextFieldApp
                name={fieldsSale.TOTAL}
                control={control}
                label="Total"
                currency
                required
                disabled={loadingForm}
              />
              <div>
                <Typography>
                  Caso não seja selecionado a data será marcado com a data de hoje
                </Typography>
                <DatePicker label="Data(opcional)" name={fieldsSale.CREATED_AT} control={control} />
              </div>
            </GridForm>

            <ButtonSubmitApp loading={loadingForm} smDown={smDown} textButton="CADASTRAR" />
          </StyledCard>
        </Form>
      )}
    </LayoutBaseDePagina>
  );
}
