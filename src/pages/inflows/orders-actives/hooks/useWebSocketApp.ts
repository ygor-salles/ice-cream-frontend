import { useEffect } from 'react';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { db, ref, onChildAdded, limitToLast, query } from 'shared/web-socket/firebaseConfig';
// import { socket } from 'shared/web-socket/socket-io';

const playSound = () => {
  const audio = new Audio('/sounds/bell-2.wav');
  audio.play();
};

interface Props {
  loadingSales: boolean;
  setAllSales: React.Dispatch<React.SetStateAction<InstanceSale[]>>;
}

export function useWebSocketApp({ loadingSales, setAllSales }: Props) {
  // TODO: Utilizar quando tiver um backend com suporte ao web socket
  // useEffect(() => {
  //   socket.on('new_sale', (orderWithAcai: InstanceSale) => {
  //     playSound();
  //     setAllSales(prev => [...prev, orderWithAcai]);
  //   });

  //   return () => {
  //     socket.off('new_sale');
  //   };
  // }, []);

  useEffect(() => {
    if (loadingSales) return;

    const salesRef = query(ref(db, 'sales'), limitToLast(1));
    const unsubscribe = onChildAdded(salesRef, snapshot => {
      const newSale = snapshot.val() as InstanceSale;
      if (!newSale) return;

      setAllSales(prev => {
        const foundSale = prev.some(sale => sale.id === newSale.id);
        if (foundSale) return prev;

        playSound();
        return [...prev, newSale];
      });
    });

    return () => unsubscribe();
  }, [loadingSales, setAllSales]);
}
