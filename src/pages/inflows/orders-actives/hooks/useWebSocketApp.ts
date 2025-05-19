import { useEffect } from 'react';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { socket } from 'shared/web-socket/socket-io';

const playSound = () => {
  const audio = new Audio('/sounds/bell-2.wav');
  audio.play();
};

interface Props {
  setAllSales: React.Dispatch<React.SetStateAction<InstanceSale[]>>;
}

export function useWebSocketApp({ setAllSales }: Props) {
  useEffect(() => {
    socket.on('new_sale', (orderWithAcai: InstanceSale) => {
      if (orderWithAcai) {
        setAllSales(prev => [...prev, orderWithAcai]);
        playSound();
      }
    });

    return () => {
      socket.off('new_sale');
    };
  }, []);
}
