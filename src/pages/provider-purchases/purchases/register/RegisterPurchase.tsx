import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import CheckboxApp from 'shared/components/checkbox/CheckboxApp';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import { IFormPurchase, schemaCreatePurchase } from 'shared/dtos/IPurchaseDTO';
import { useProvider } from 'shared/hooks/network/useProvider';
import { usePurchase } from 'shared/hooks/network/usePurchase';
import { LayoutBaseDePagina } from 'shared/layouts';

import { Form, GridForm, StyledCard } from './styles';

export function RegisterPurchase(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, reset } = useForm<IFormPurchase>({
    resolver: yupResolver(schemaCreatePurchase),
    defaultValues: {
      value_total: '',
      observation: '',
      its_ice_cream_shoop: true,
      file: null,
      provider_id: '',
    },
  });

  const { handleSubmitCreate, loadingForm: loading } = usePurchase();

  const { allProviders, getProviders } = useProvider();

  useEffect(() => {
    getProviders();
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro fornecedor"
      navigatePage="/providers"
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
              name="value_total"
              control={control}
              label="Valor total"
              currency
              required
              disabled={loading}
            />
            <TextFieldApp
              name="observation"
              control={control}
              label="Observação"
              required
              disabled={loading}
            />
            <SelectApp
              name="provider_id"
              control={control}
              options={allProviders}
              setId
              sortAlphabeticallyObject
              label="Fornecedor"
              required
              disabled={loading}
            />
            <CheckboxApp
              name="its_ice_cream_shoop"
              control={control}
              label="Compra da sorveteria"
              disabled={loading}
            />
          </GridForm>

          <ButtonSubmitApp loading={loading} smDown={smDown} textButton="CADASTRAR" />
        </StyledCard>
      </Form>
    </LayoutBaseDePagina>
  );
}
