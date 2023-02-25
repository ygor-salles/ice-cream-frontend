import { Icon } from '@mui/material';
import dump from 'assets/dump.png';
import { IPurchaseDTO } from 'shared/dtos/IPurchaseDTO';
import formatDateTime from 'shared/utils/formatDateTime';
import transformImageUrl from 'shared/utils/transformImageUrl';

import { Container, Image, Observation, Wrapper, Row, WrapperAction } from './styles';

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
  return (
    <Container isMobile={isMobile}>
      <Image src={rowData.nf_url ? transformImageUrl(rowData.nf_url) : dump} isMobile={isMobile} />
      <Wrapper>
        {rowData.observation && (
          <Observation isDarkTheme={isDarkTheme}>{rowData.observation}</Observation>
        )}
        <Row>
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
  );
};

export default CollapsePurchase;