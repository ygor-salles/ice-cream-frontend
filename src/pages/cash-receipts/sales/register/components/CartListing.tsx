import { Delete } from '@mui/icons-material';
import { Accordion, AccordionDetails, Button, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Control } from 'react-hook-form';
import { LISTTYPESALES, LISTTYPESALES_NOTDEBIT } from 'shared/constants/listTypeSales';
import { EnumTypeSale, IFormEditSale, fieldsSale } from 'shared/dtos/ISaleDTO';
import { useThemeContext } from 'shared/hooks/useThemeContext';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import {
  AddCircle,
  BttIcon,
  ContentSummary,
  Empty,
  Li,
  Main,
  Row,
  StyledSelectApp,
  StyledTextField,
  Total,
  Ul,
  WrapperButtons,
  WrapperDel,
  TextTSale,
} from './styles';

interface CartListing {
  listSale: IDataProduct[];
  observation?: string;
  type_sale?: EnumTypeSale;
  totalSum: number;
  textPrimary: string;
  textSecondary: string;
  disabledSecondary?: boolean;
  disabledActions?: boolean;
  renderMain?: React.ReactElement;
  loading?: boolean;
  control?: Control<IFormEditSale>;
  renderTopButtons?: React.ReactElement;
  renderBottomButtons?: React.ReactElement;
  hasClient?: boolean;
  onAddList?: () => void;
  onDeleteList: (object: IDataProduct) => void;
  onClickPrimary: () => void;
  onClickSeconadary: () => void;
}

const CartListing: React.FC<CartListing> = ({
  listSale,
  observation,
  type_sale,
  totalSum,
  textPrimary,
  textSecondary,
  disabledSecondary,
  renderMain,
  disabledActions,
  loading,
  control,
  renderTopButtons,
  renderBottomButtons,
  hasClient,
  onAddList,
  onDeleteList,
  onClickPrimary,
  onClickSeconadary,
  ...rest
}) => {
  const { themeName } = useThemeContext();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const listTypeSales = useMemo(() => {
    return hasClient ? LISTTYPESALES : LISTTYPESALES_NOTDEBIT;
  }, [hasClient]);

  return (
    <Main {...rest}>
      <div>
        {control ? (
          <>
            <StyledTextField
              name={fieldsSale.OBSERVATION}
              control={control}
              label="Observação"
              variant="outlined"
              disabled={disabledActions}
            />

            <Row hasBottom hasTop>
              <StyledTextField
                name={fieldsSale.UPDATED_AT}
                control={control}
                label="Data atualização"
                variant="outlined"
                disabled
              />
              <StyledTextField
                name={fieldsSale.CREATED_AT}
                control={control}
                label="Data criação"
                variant="outlined"
                disabled
              />
            </Row>
            <StyledSelectApp
              name={fieldsSale.TYPE_SALE}
              control={control}
              options={[
                ...listTypeSales,
                {
                  id: 5,
                  name: 'FECHAMENTO DE CAIXA',
                },
              ]}
              label="Tipo de venda"
              variant="outlined"
              disabled={disabledActions}
            />
          </>
        ) : (
          <Row hasBottom>
            <Typography>
              <b>Observação:</b> {observation}
            </Typography>
            <TextTSale isDebit={type_sale === EnumTypeSale.DEBIT}>
              <b>*</b> {type_sale}
            </TextTSale>
          </Row>
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
                      item?.combinations?.length > 0 ? ' - comb' : ''
                    }`}</Typography>
                    <WrapperDel>
                      <Typography>{formatNumberToCurrency(item.total)}</Typography>
                      <BttIcon
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          onDeleteList(item);
                        }}
                        disabled={disabledActions || loading}
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
          </>
        ) : (
          <Empty isDark={themeName === 'dark'}>Não há pedidos cadastrados</Empty>
        )}
        <Row hasTop>
          <div>
            {onAddList && (
              <BttIcon type="button" disabled={disabledActions || loading} onClick={onAddList}>
                <AddCircle color="success" />
              </BttIcon>
            )}
          </div>
          {totalSum > 0 && <Total>Total: {formatNumberToCurrency(totalSum)}</Total>}
        </Row>
        {renderMain && renderMain}
      </div>

      <WrapperButtons>
        <div>
          {renderTopButtons && !disabledActions && renderTopButtons}
          <Button
            type="button"
            variant="contained"
            color="secondary"
            disabled={loading}
            onClick={onClickPrimary}
          >
            {textPrimary}
          </Button>
        </div>
        <div>
          {renderBottomButtons && !disabledActions && renderBottomButtons}
          <Button
            type="button"
            variant="contained"
            disabled={loading || disabledSecondary}
            onClick={onClickSeconadary}
          >
            {textSecondary}
          </Button>
        </div>
      </WrapperButtons>
    </Main>
  );
};

export default CartListing;
