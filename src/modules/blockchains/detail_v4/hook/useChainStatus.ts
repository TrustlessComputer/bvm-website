import { useMemo } from 'react';
import { useChainProvider } from '../provider/ChainProvider.hook';
import { OrderStatus } from '@/stores/states/l2services/types';

export const useChainStatus = () => {
  const { order } = useChainProvider();

  return useMemo(() => {
    let statusCode: OrderStatus = OrderStatus.Started;
    let statusStr = 'Running';

    if (order) {
      statusCode = order.status;

      switch (order.status) {
        case OrderStatus.Started:
          statusStr = 'Running';
          break;
        case OrderStatus.WaitingPayment:
          statusStr = 'Waiting for payment';
          break;
        case OrderStatus.Processing:
          statusStr = 'Setting up';
          break;
        case OrderStatus.Updating:
          statusStr = 'Updating';
          break;
        case OrderStatus.Rejected:
          statusStr = 'Failed';
          break;
        case OrderStatus.Resume:
          statusStr = 'Please wait for service to resume';
          break;
        case OrderStatus.InsufficientBalance:
          statusStr = `Must top up to your account`;
          break;
        case OrderStatus.Ended:
          statusStr = 'Ended';
          break;
        case OrderStatus.Canceled:
          statusStr = 'Canceled';
          break;
        case OrderStatus.IsDown:
          statusStr = 'Down';
          break;
      }
    }

    return {
      statusCode,
      statusStr,
    };
  }, [order]);
};
