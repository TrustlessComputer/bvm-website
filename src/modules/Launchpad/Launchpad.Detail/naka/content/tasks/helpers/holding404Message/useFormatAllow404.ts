import React from 'react';
import BigNumber from 'bignumber.js';
import { SignatureStatus } from '@/interfaces/whitelist';
import { allow404Selector } from '@/stores/states/user/selector';
import { useSelector } from 'react-redux';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some(
      (item) =>
        item.status === 'unclaimed' && !!Number(item.brc404_point || '0'),
    ),
  };
};

interface IAmount {
  brc404_point: number;
  unClaimedPoint: number;
}

const useFormatAllow404 = () => {
  const { loaded, status } = useSelector(allow404Selector);
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status);
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce(
      (prev, curr) => {
        let value = {
          brc404_point: new BigNumber(curr.brc404_point || '0')
            .plus(prev.brc404_point)
            .toNumber(),
          unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.brc404_point || '0' : '0')
            .toNumber(),
        };
        value = {
          ...value,
        } as IAmount;
        return value as IAmount;
      },
      {
        brc404_point: 0,
        unClaimedPoint: 0,
      } as IAmount,
    );
  }, [status]);

  return {
    loaded,
    status,
    isProcessing,
    amount,
    isUnclaimed: isUnclaimed && amount.unClaimedPoint && !isProcessing,
  };
};

export default useFormatAllow404;
