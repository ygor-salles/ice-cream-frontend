import { useEffect } from 'react';
import { EnumTypeProduct } from 'shared/dtos';
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
    socket.on('new_sale', (orderWithAcai: InstanceSale) => {
      if (orderWithAcai) {
        const hasAcai = orderWithAcai.data_product.some(
          product => product.type === EnumTypeProduct.ACAI,
        );
        if (!hasAcai) return;

        setAllSales(prev => [...prev, orderWithAcai]);
        playSound('/sounds/bell-create.wav');
      }
    });

    socket.on('delete_sale', (orderWithAcai: InstanceSale) => {
      const hasAcai = orderWithAcai.data_product.some(
        product => product.type === EnumTypeProduct.ACAI,
      );
      if (!hasAcai) return;

      setAllSales(prev => prev.filter(item => item.id !== orderWithAcai.id));
      playSound('/sounds/bell-delete.wav');
    });

    socket.on('update_sale', (orderWithAcai: InstanceSale) => {
      const hasAcai = orderWithAcai.data_product.some(
        product => product.type === EnumTypeProduct.ACAI,
      );
      if (!hasAcai) return;

      setAllSales(prev => {
        if (orderWithAcai.in_progress) {
          playSound('/sounds/bell-edit.wav');
          return prev.map(item => (item.id === orderWithAcai.id ? orderWithAcai : item));
        }

        playSound('/sounds/bell-delete.wav');
        return prev.filter(item => item.id !== orderWithAcai.id);
      });
    });

    return () => {
      socket.off('new_sale');
      socket.off('delete_sale');
      socket.off('update_sale');
    };
  }, [setAllSales]);
}
