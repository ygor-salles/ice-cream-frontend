import { Dialog, Icon } from '@mui/material';
import dump from 'assets/dump.png';
import { useState } from 'react';
import { IPurchaseDTO } from 'shared/dtos/IPurchaseDTO';
import formatDateTime from 'shared/utils/formatDateTime';
import transformImageUrl from 'shared/utils/transformImageUrl';

import {
  Container,
  Image,
  Observation,
  Wrapper,
  Row,
  WrapperAction,
  ImgDialog,
  Close,
} from './styles';

interface PropTypes {
  rowData: IPurchaseDTO;
  isDarkTheme: boolean;
  isMobile: boolean;
  onClickEdit: (data: any) => void;
  onClickDelete: (data: any) => void;
}

const CollapsePurchase: React.FC<PropTypes> = ({
  rowData,
  isDarkTheme,
  isMobile,
  onClickEdit,
  onClickDelete,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Container isMobile={isMobile}>
        <Image
          src={rowData.nf_url ? transformImageUrl(rowData.nf_url) : dump}
          isMobile={isMobile}
          onClick={() => setOpenDialog(true)}
        />
        <Wrapper>
          {rowData.observation && (
            <Observation isDarkTheme={isDarkTheme}>{rowData.observation}</Observation>
          )}
          <Row alignCenter>
            <Observation isDarkTheme={isDarkTheme}>
              {formatDateTime(rowData?.updated_at) || '--'}
            </Observation>
            <WrapperAction isMobile={isMobile}>
              <Icon
                color="secondary"
                style={{ cursor: 'pointer' }}
                onClick={() => onClickEdit(rowData)}
              >
                edit
              </Icon>
              <Icon
                color="warning"
                style={{ cursor: 'pointer' }}
                onClick={() => onClickDelete(rowData)}
              >
                delete
              </Icon>
            </WrapperAction>
          </Row>
        </Wrapper>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <ImgDialog src={rowData.nf_url ? transformImageUrl(rowData.nf_url) : dump} />
        <Close onClick={() => setOpenDialog(false)} />
      </Dialog>
    </>
  );
};

export default CollapsePurchase;
