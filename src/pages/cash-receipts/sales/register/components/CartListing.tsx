import { Delete } from '@mui/icons-material';
import { Accordion, AccordionDetails, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';
import { useThemeContext } from 'shared/hooks/useThemeContext';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import formatDateTime from 'shared/utils/formatDateTime';
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
  Main,
  Row,
  AddCircle,
} from './styles';

interface CartListing {
  listSale: IDataProduct[];
  observation: string;
  updated_at?: string | Date;
  type_sale?: EnumTypeSale;
  totalSum: number;
  textPrimary: string;
  textSecondary: string;
  disabledActions?: boolean;
  renderMain?: React.ReactElement;
  renderTopButtons?: React.ReactElement;
  renderBottomButtons?: React.ReactElement;
  loading?: boolean;
  onAddList?: () => void;
  onDeleteList: (object: IDataProduct) => void;
  onClickPrimary: () => void;
  onClickSeconadary: () => void;
}

const CartListing: React.FC<CartListing> = ({
  listSale,
  observation,
  updated_at,
  type_sale,
  totalSum,
  textPrimary,
  textSecondary,
  renderMain,
  disabledActions,
  renderTopButtons,
  renderBottomButtons,
  loading,
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

  return (
    <Main {...rest}>
      <div>
        {observation && (
          <Typography style={{ marginBottom: 5 }}>
            <b>Observação:</b> {observation}
          </Typography>
        )}

        {updated_at && type_sale && (
          <Row hasBottom>
            <Typography>
              <b>Data:</b> {formatDateTime(updated_at) || '--'}
            </Typography>
            <Typography>
              <b>*</b> {type_sale}
            </Typography>
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
          </>
        ) : (
          <Empty isDark={themeName === 'dark'}>Não há pedidos cadastrados</Empty>
        )}
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
            disabled={listSale.length === 0 || loading}
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
