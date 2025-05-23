import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';
import { IFormEditSale } from 'shared/dtos';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { formatDateTime } from 'shared/utils';
import { socket } from 'shared/web-socket/socket-io';

interface Props {
  saleDetail: InstanceSale;
  setSaleDetail: React.Dispatch<React.SetStateAction<InstanceSale>>;
  reset: UseFormReset<IFormEditSale>;
}

export function useWebsocketAppSaleDetail({ saleDetail, reset, setSaleDetail }: Props) {
  useEffect(() => {
    socket.on('update_sale', (orderWs: InstanceSale) => {
      if (!orderWs) return;
      setSaleDetail(orderWs);
    });

    return () => {
      socket.off('update_sale');
    };
  }, []);

  useEffect(() => {
    reset({
      ...saleDetail,
      created_at: formatDateTime(saleDetail.created_at) ?? '--',
      updated_at: formatDateTime(saleDetail.updated_at) ?? '--',
    });
  }, [saleDetail, reset]);
}
