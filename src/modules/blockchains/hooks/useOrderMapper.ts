import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import { formatUnixDateTime } from '@/utils/time';
import React from 'react';
import { DALayerEnumMap } from '../Buy/Buy.constanst';
import { CHAIN_ID } from '@/services/api/l2services/constants';

const APP_NAME = 'Bitcoin L2';

const useOrderMapper = (order: OrderItem) => {
  const convertSecondsToHours = () => {
    const seconds = Number(order.finalizationPeriod || 0);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    let result = '';
    if (days !== 0) {
      const suffix = days > 1 ? 's ' : ' ';
      result = `${days} day${suffix} `;
    }
    if (hours !== 0) {
      const suffix = hours > 1 ? 's' : '';
      result = `${result}${hours} hour${suffix}`;
    } else {
      result = `${result}`;
    }
    return result;
  };

  const convertSecondsToMinutes = () => {
    const seconds = Number(order.blockTime || 0);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    let result = '';
    if (minutes !== 0) {
      result = `${minutes} minutes `;
    }
    if (remainingSeconds !== 0) {
      result = `${result}${remainingSeconds} seconds`;
    } else {
      result = `${result}`;
    }
    return result;
  };

  const Color = {
    Success: 'positive',
    Warning: 'warning',
    Failed: 'negative',
  };

  return React.useMemo(() => {
    let status = '';
    let subStatus = '';
    let color;
    const finalizationPeriod = convertSecondsToHours();
    const nextBillingFormatted = formatUnixDateTime({
      dateTime: order.nextBillingAt || 0,
    });

    switch (order.status) {
      case OrderStatus.Rejected:
        status = 'Failed';
        // color = Color.Failed;
        color = '#FF4747';
        break;
      case OrderStatus.WaitingPayment:
        status = 'Waiting for payment';
        // color = Color.Warning;
        color = '#FFA500';
        break;
      case OrderStatus.Processing:
        status = 'Setting up';
        // color = Color.Warning;
        subStatus = `(${
          order.isMainnet
            ? 'This process can take up to 12 hours'
            : 'This process can take up to 20 minutes'
        })`;
        color = '#FFA500';
        break;
      case OrderStatus.Started:
        status = 'Healthy';
        // color = Color.Success;
        color = '#0ec00e';
        break;
      case OrderStatus.Resume:
        status = 'Please wait for service to resume';
        // color = Color.Success;
        color = '#0ec00e';
        break;
      case OrderStatus.InsufficientBalance:
        status = `Must top up to your account`;
        // color = Color.Failed;
        color = '#FF4747';
        break;
      case OrderStatus.Ended:
        status = 'Ended';
        // color = Color.Failed;
        color = '#FF4747';
        break;
      case OrderStatus.Canceled:
        status = 'Canceled';
        // color = Color.Warning;
        color = '#FFA500';
        break;
    }

    const dataAvailabilityLayer = (DALayerEnumMap as any)[
      order.dataAvaibilityChain
    ];

    let computerIndexer = '';
    if (order.isConstant) {
      computerIndexer = `${APP_NAME} #${order.index}`;
    } else if (order.index !== 0) {
      computerIndexer = `${APP_NAME} #${order.index}`;
    }

    const deployer =
      order.userName || (order.tcAddress ? order.tcAddress.slice(0, 6) : '');

    return {
      status,
      color,
      finalizationPeriod, // in hours
      nextBillingFormatted,
      blockTime: convertSecondsToMinutes(),
      dataAvailabilityLayer,
      computerIndexer,
      isShowLink: order.status === OrderStatus.Started,
      subStatus,
      deployer,
      isLayer1:
        CHAIN_ID.TRUSTLESS_COMPUTER === Number(order?.chainId) ||
        CHAIN_ID.TRUSTLESS_COMPUTER_TEST === Number(order?.chainId),
    };
  }, [order]);
};

export default useOrderMapper;
