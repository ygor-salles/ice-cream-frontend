import { Delete } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  Backdrop,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { LISTTYPESALES, LISTTYPESALES_NOTDEBIT } from 'shared/constants/listTypeSales';
import { EnumTypeSale, fieldsSale } from 'shared/dtos/ISaleDTO';
import { useThemeContext } from 'shared/hooks/useThemeContext';
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
  TextTSale,
  Total,
  Ul,
  WrapperButtons,
  WrapperDel,
} from './styles';
import { CartListingProps } from './types';

export const CartListing = ({
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
}: CartListingProps) => {
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
              isDark={themeName === 'dark'}
            />

            <Row hasBottom hasTop>
              <StyledTextField
                name={fieldsSale.UPDATED_AT}
                control={control}
                label="Data atualização"
                variant="outlined"
                disabled
                isDark={themeName === 'dark'}
              />
              <StyledTextField
                name={fieldsSale.CREATED_AT}
                control={control}
                label="Data criação"
                variant="outlined"
                disabled
                isDark={themeName === 'dark'}
              />
            </Row>
            <StyledSelectApp
              name={fieldsSale.TYPE_SALE}
              control={control}
              options={listTypeSales}
              label="Tipo de venda"
              variant="outlined"
              disabled={disabledActions}
              isDark={themeName === 'dark'}
            />
          </>
        ) : (
          <Row hasBottom>
            <Typography>
              <b>Observação:</b> {observation || '--'}
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

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Main>
  );
};
