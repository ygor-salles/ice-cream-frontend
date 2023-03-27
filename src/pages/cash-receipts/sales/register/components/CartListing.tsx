import { Delete } from '@mui/icons-material';
import { Accordion, AccordionDetails, Button, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { IFormSale } from 'shared/dtos/ISaleDTO';
import { useThemeContext } from 'shared/hooks/useThemeContext';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import {
  BttIcon,
  ContentSummary,
  Empty,
  Li,
  Total,
  Ul,
  WrapperButtons,
  WrapperDel,
} from './styles';

interface CartListing {
  listSale: IDataProduct[];
  observation: string;
  onToggleScreenCarListing: () => void;
  setValue: UseFormSetValue<IFormSale>;
  onSubmit: () => void;
  onDeleteList: (object: IDataProduct) => void;
}

const CartListing: React.FC<CartListing> = ({
  listSale,
  observation,
  onToggleScreenCarListing,
  onDeleteList,
  setValue,
  onSubmit,
}) => {
  const { themeName } = useThemeContext();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const totalSum = useMemo(() => {
    if (listSale?.length > 0) {
      return listSale.reduce((acumulator, current) => acumulator + current.total, 0);
    }
    return 0;
  }, [listSale]);

  return (
    <>
      {observation && (
        <Typography style={{ marginBottom: 10 }}>Observação: {observation}</Typography>
      )}
      {listSale.length > 0 ? (
        <>
          {React.Children.toArray(
            listSale.map((item, index) => (
              <Accordion
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
              >
                <ContentSummary>
                  <Typography>{`${item.amount} ${item.name}${
                    item?.combinations?.length > 0 ? ' - C/comb' : ''
                  }`}</Typography>
                  <WrapperDel>
                    <Typography>{formatNumberToCurrency(item.total)}</Typography>
                    <BttIcon
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        onDeleteList(item);
                      }}
                    >
                      <Delete color="warning" />
                    </BttIcon>
                  </WrapperDel>
                </ContentSummary>
                <AccordionDetails>
                  {item?.combinations?.length > 0 && (
                    <Ul>
                      {item.combinations.map(item => (
                        <Li key={item.name}>{`${item.name} - ${formatNumberToCurrency(
                          item.price,
                        )}`}</Li>
                      ))}
                    </Ul>
                  )}
                </AccordionDetails>
              </Accordion>
            )),
          )}
          {totalSum > 0 && <Total>Total: {formatNumberToCurrency(totalSum)}</Total>}
        </>
      ) : (
        <Empty isDark={themeName === 'dark'}>Não há pedidos cadastrados</Empty>
      )}
      <WrapperButtons>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => {
            setValue('product_name', '');
            setValue('data_product', null);
            setValue('total', '');
            onToggleScreenCarListing();
          }}
        >
          Inserir mais
        </Button>
        <Button
          type="button"
          variant="contained"
          disabled={listSale.length === 0}
          onClick={onSubmit}
        >
          Finalizar pedido
        </Button>
      </WrapperButtons>
    </>
  );
};

export default CartListing;
