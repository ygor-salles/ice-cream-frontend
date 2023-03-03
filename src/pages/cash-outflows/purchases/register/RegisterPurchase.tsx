import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import CheckboxApp from 'shared/components/checkbox/CheckboxApp';
import InputFile from 'shared/components/inputFile/InputFile';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import { RoutesEnum } from 'shared/constants/routesList';
import {
  defaultValuesPurchase,
  fieldsPurchase,
  IFormPurchase,
  schemaCreatePurchase,
} from 'shared/dtos/IPurchaseDTO';
import { useProvider } from 'shared/hooks/network/useProvider';
import { usePurchase } from 'shared/hooks/network/usePurchase';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function RegisterPurchase(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, reset, setValue, watch } = useForm<IFormPurchase>({
    resolver: yupResolver(schemaCreatePurchase),
    defaultValues: defaultValuesPurchase,
  });

  const values = watch();

  const { handleSubmitCreate, loadingForm: loading } = usePurchase();

  const { allProviders, getProviders } = useProvider();

  useEffect(() => {
    getProviders();
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro compras"
      navigatePage={RoutesEnum.PURCHASES}
      textButton="VOLTAR"
      icon={<ArrowBack />}
    >
      <Form
        noValidate
        onSubmit={handleSubmit((data: IFormPurchase) => handleSubmitCreate(data, reset))}
      >
        <StyledCard>
          <GridForm>
            <TextFieldApp
              name={fieldsPurchase.VALUE_TOTAL}
              control={control}
              label="Valor total"
              currency
              required
              disabled={loading}
            />
            <TextFieldApp
              name={fieldsPurchase.OBSERVATION}
              control={control}
              label="Observação"
              disabled={loading}
            />
            <SelectApp
              name={fieldsPurchase.PROVIDER_ID}
              control={control}
              options={allProviders}
              setId
              sortAlphabeticallyObject
              label="Fornecedor"
              required
              disabled={loading}
            />
            <CheckboxApp
              name={fieldsPurchase.ITS_ICE_CREAM_SHOP}
              control={control}
              label="Compra da sorveteria"
              disabled={loading}
            />
            <InputFile
              name={fieldsPurchase.FILE}
              isMobile={smDown}
              label="Anexe a nota fiscal"
              control={control}
              disabled={loading}
            />
          </GridForm>

          <ButtonSubmitApp loading={loading} smDown={smDown} textButton="CADASTRAR" />
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
