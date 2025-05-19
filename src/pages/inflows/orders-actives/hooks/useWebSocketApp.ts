import Pusher from 'pusher-js';
import { useEffect } from 'react';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
// import { db, ref, onChildAdded, limitToLast, query } from 'shared/web-socket/firebaseConfig';
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

  // TODO: Sem suporte ao web socket firebase
  // useEffect(() => {
  //   if (loadingSales) return;

  //   const salesRef = query(ref(db, 'sales'), limitToLast(1));
  //   const unsubscribe = onChildAdded(salesRef, snapshot => {
  //     const newSale = snapshot.val() as InstanceSale;
  //     if (!newSale) return;
  //     console.log('newSale firebase', newSale);

  //     setAllSales(prev => {
  //       const foundSale = prev.some(sale => sale.id === newSale.id);
  //       if (foundSale) return prev;
  //       console.log('foundSale', foundSale);
  //       console.log('prev', prev);

  //       playSound();
  //       return [newSale, ...prev];
  //     });
  //   });

  //   return () => unsubscribe();
  // }, [loadingSales, setAllSales]);

  useEffect(() => {
    // if (loadingSales) return;

    const pusher = new Pusher('160d1673434507dddb18', {
      cluster: 'us2',
    });

    const channel = pusher.subscribe('channel-sales');

    channel.bind('sales', (data: InstanceSale) => {
      console.log('data', data);
      setAllSales(prev => [...prev, data]);
      playSound();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [setAllSales]);
}
