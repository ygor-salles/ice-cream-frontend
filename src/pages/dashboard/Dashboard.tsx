import { yupResolver } from '@hookform/resolvers/yup';
import { FilterAlt } from '@mui/icons-material';
import { Skeleton, Theme, Typography, useMediaQuery } from '@mui/material';
import imageInput from 'assets/entradas.svg';
import imageOutput from 'assets/saídas.svg';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxApp from 'shared/components/checkbox/CheckboxApp';
import DatePicker from 'shared/components/datePicker/DatePicker';
import SelectApp from 'shared/components/select/Select';
import { LISTTYPESALES } from 'shared/constants/listTypeSales';
import { useAppThemeContext } from 'shared/contexts';
import {
  defaultValuesFilterPurchase,
  fieldsFilterPurchase,
  IFormFilterPurchase,
  schemaFilterPurchase,
} from 'shared/dtos/IPurchaseDTO';
import {
  defaultValuesFilterSale,
  fieldsFilterSale,
  IFormFilterSales,
  schemaFilterSale,
} from 'shared/dtos/ISaleDTO';
import { useProvider } from 'shared/hooks/network/useProvider';
import { usePurchase } from 'shared/hooks/network/usePurchase';
import { useSale } from 'shared/hooks/network/useSale';
import { LayoutBaseDePagina } from 'shared/layouts';
import formatDate from 'shared/utils/formatDate';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';
import { Colors } from 'styles/global';

import {
  Accordion,
  Card,
  Container,
  Img,
  HeaderCard,
  AttachMoney,
  CardTotal,
  Form,
  StyledButtonSubmitApp,
  TextDate,
  ContentDate,
} from './styles';

export function Dashboard() {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { themeName } = useAppThemeContext();

  const [showInputFilter, setShowInputFilter] = useState(false);
  const [showOutputFilter, setShowOutputFilter] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const { getSumSalesToday, getSumSalesByPeriod, sumSalesState, loadingSales } = useSale();

  const { getSumPurchasesToday, getSumPurchasesByPeriod, sumPurchasesState, loadingPurchases } =
    usePurchase();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<IFormFilterSales>({
    resolver: yupResolver(schemaFilterSale),
    defaultValues: defaultValuesFilterSale,
  });

  const {
    handleSubmit: handleSubmitPurc,
    control: controlPurc,
    reset: resetPurc,
    formState: { isValid: isValidPurc },
  } = useForm<IFormFilterPurchase>({
    resolver: yupResolver(schemaFilterPurchase),
    defaultValues: defaultValuesFilterPurchase,
  });

  const { allProviders, getProviders } = useProvider();

  const total = sumSalesState - sumPurchasesState ?? 0;

  useEffect(() => {
    setLoadingRequests(true);
    Promise.all([getSumSalesToday(), getSumPurchasesToday(), getProviders()]).finally(() =>
      setLoadingRequests(false),
    );
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      textButton="ENTRADAS"
      icon={<FilterAlt />}
      colorButton="success"
      onClick={() => {
        setShowOutputFilter(false);
        setShowInputFilter(value => !value);
      }}
      textButtonRight="SAÍDAS"
      colorButtonRight="error"
      iconRight={<FilterAlt />}
      onClickRight={() => {
        setShowInputFilter(false);
        setShowOutputFilter(value => !value);
      }}
    >
      {loadingRequests || loadingPurchases || loadingSales ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <>
          <Accordion open={showInputFilter}>
            <Form
              id="form-filter-sale"
              onSubmit={handleSubmit((data: IFormFilterSales) => getSumSalesByPeriod(data, reset))}
            >
              <ContentDate>
                <DatePicker
                  label="Data início"
                  name={fieldsFilterSale.START_DATE}
                  control={control}
                />
                <DatePicker label="Data fim" name={fieldsFilterSale.END_DATE} control={control} />
              </ContentDate>
              <SelectApp
                name={fieldsFilterSale.TYPE_SALE}
                control={control}
                options={LISTTYPESALES}
                label="Tipo de venda"
              />
              <StyledButtonSubmitApp
                loading={false}
                textButton="Buscar"
                smDown={smDown}
                // disabled={isValid}
              />
            </Form>
          </Accordion>

          <Accordion open={showOutputFilter}>
            <Form
              id="form-filter-purchase"
              onSubmit={handleSubmitPurc((data: IFormFilterPurchase) =>
                getSumPurchasesByPeriod(data, resetPurc),
              )}
            >
              <ContentDate>
                <DatePicker
                  label="Data início"
                  name={fieldsFilterPurchase.START_DATE}
                  control={controlPurc}
                />
                <DatePicker
                  label="Data fim"
                  name={fieldsFilterPurchase.END_DATE}
                  control={controlPurc}
                />
              </ContentDate>
              <SelectApp
                name={fieldsFilterPurchase.PROVIDER_ID}
                control={controlPurc}
                options={allProviders}
                setId
                sortAlphabeticallyObject
                label="Fornecedor"
              />
              <CheckboxApp
                name={fieldsFilterPurchase.ITS_ICE_CREAM_SHOOP}
                control={controlPurc}
                label="Fornecedor da sorveteria"
              />
              <StyledButtonSubmitApp
                loading={false}
                textButton="Buscar"
                smDown={smDown}
                // disabled={!isValidPurc}
              />
            </Form>
          </Accordion>

          <Container>
            <Card>
              <HeaderCard>
                <div>
                  <Typography variant="h6" color={Colors.GREEN}>
                    Entradas
                  </Typography>
                  <TextDate isDarkTheme={themeName === 'dark'}>{formatDate(new Date())}</TextDate>
                </div>
                <Img src={imageInput} alt="entradas" />
              </HeaderCard>
              <Typography variant="h4">{formatNumberToCurrency(sumSalesState ?? 0)}</Typography>
            </Card>
            <Card>
              <HeaderCard>
                <div>
                  <Typography variant="h6" color={Colors.RED}>
                    Saídas
                  </Typography>
                  <TextDate isDarkTheme={themeName === 'dark'}>{formatDate(new Date())}</TextDate>
                </div>
                <Img src={imageOutput} alt="saídas" />
              </HeaderCard>
              <Typography variant="h4">{formatNumberToCurrency(sumPurchasesState ?? 0)}</Typography>
            </Card>
            <CardTotal isPositive={total >= 0}>
              <HeaderCard>
                <div>
                  <Typography variant="h6" color="white">
                    Lucro
                  </Typography>
                  <TextDate isDarkTheme>{formatDate(new Date())}</TextDate>
                </div>
                <AttachMoney />
              </HeaderCard>
              <Typography variant="h4" color="white">
                {formatNumberToCurrency(total)}
              </Typography>
            </CardTotal>
          </Container>
        </>
      )}
    </LayoutBaseDePagina>
  );
}
