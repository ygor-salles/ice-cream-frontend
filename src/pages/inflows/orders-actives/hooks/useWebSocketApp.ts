import { useEffect } from 'react';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { socket } from 'shared/web-socket/socket-io';

const playSound = (bell: string) => {
  const audio = new Audio(bell);
  audio.play();
};

interface Props {
  setAllSales: React.Dispatch<React.SetStateAction<InstanceSale[]>>;
}

export function useWebSocketApp({ setAllSales }: Props) {
  useEffect(() => {
    socket.on('new_sale_active', (orderWs: InstanceSale) => {
      if (!orderWs) return;

      setAllSales(prev => {
        const updateOrders = [...prev, orderWs];

        updateOrders.sort((a, b) => {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });

        return updateOrders;
      });
      playSound('/sounds/bell-create.wav');
    });

    socket.on('delete_sale_active', (orderWs: InstanceSale) => {
      if (!orderWs) return;
      setAllSales(prev => prev.filter(item => item.id !== orderWs.id));
      playSound('/sounds/bell-delete.wav');
    });

    socket.on('update_sale_active', (orderWs: InstanceSale) => {
      if (!orderWs) return;
      setAllSales(prev => prev.map(item => (item.id === orderWs.id ? orderWs : item)));
      playSound('/sounds/bell-edit.wav');
    });

    return () => {
      socket.off('new_sale_active');
      socket.off('delete_sale_active');
      socket.off('update_sale_active');
    };
  }, [setAllSales]);
}
