import { SignatureStatus } from '@/interfaces/whitelist';
import { useAppSelector } from '@/store/hooks';
import { holdingSWPL2Selector } from '@/store/states/user/selector';
import BigNumber from 'bignumber.js';
import React from 'react';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some((item) => item.status === 'unclaimed'),
  };
};

interface IAmount {
  swamps_point: number;
  swamps_amount: number;
  unClaimedPoint: number;
}

const useFormatHoldingSWPL2 = () => {
  const { loaded, status } = useAppSelector(holdingSWPL2Selector);
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status);
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce(
      (prev, curr) => {
        let value = {
          swamps_point: new BigNumber(curr.swamps_point || '0')
            .plus(prev.swamps_point)
            .toNumber(),
          swamps_amount: new BigNumber(curr.swamps_amount || '0')
            .plus(prev.swamps_amount)
            .toNumber(),
          unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.swamps_point || '0' : '0')
            .toNumber(),
        };
        value = {
          ...value,
        } as IAmount;
        return value as IAmount;
      },
      {
        swamps_point: 0,
        swamps_amount: 0,
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

export default useFormatHoldingSWPL2;
