import useL2Service from '@/hooks/useL2Service';
import { useRef } from 'react';
import { useChainProvider } from '../provider/ChainProvider.hook';

const TIMER_INTERVAL = 10000; //10s

export const useFetchOrderTimer = (orderId: string) => {
  const { getOrderDetailByID } = useL2Service();

  //
  const timerRef = useRef<any>();

  const clearIntervalTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  const loopFetchChainInfor = () => {
    clearIntervalTimer();
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        if (orderId) {
          // console.log('loopFetchChainInfor -- OrderID -- ', orderId);
          getOrderDetailByID(orderId);
        }
      }, TIMER_INTERVAL);
    }
  };

  return {
    loopFetchChainInfor,
    clearIntervalTimer,
  };
};
