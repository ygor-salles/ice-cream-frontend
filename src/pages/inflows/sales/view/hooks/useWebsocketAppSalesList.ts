import { useEffect } from 'react';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { socket } from 'shared/web-socket/socket-io';

interface Props {
  setAllSales: React.Dispatch<React.SetStateAction<InstanceSale[]>>;
}

export function useWebsocketAppSalesList({ setAllSales }: Props) {
  useEffect(() => {
    socket.on('update_sale', (orderWs: InstanceSale) => {
      if (!orderWs) return;
      setAllSales(prev => prev.map(item => (item.id === orderWs.id ? orderWs : item)));
    });

    return () => {
      socket.off('update_sale');
    };
  }, []);
}
