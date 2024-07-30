import { SignatureStatus } from '@/interfaces/whitelist';
import { holdingSWPSRC20Selector } from '@/stores/states/user/selector';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useSelector } from 'react-redux';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some((item) => item.status === 'unclaimed'),
  };
};

interface IAmount {
  src20_point: number;
  src20_amount: number;
  unClaimedPoint: number;
}

const useFormatHoldingSWPSRC20 = () => {
  const { loaded, status } = useSelector(holdingSWPSRC20Selector);
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status);
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce(
      (prev, curr) => {
        let value = {
          src20_point: new BigNumber(curr.src20_point || '0')
            .plus(prev.src20_point)
            .toNumber(),
          src20_amount: new BigNumber(curr.src20_amount || '0')
            .plus(prev.src20_amount)
            .toNumber(),
          unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.src20_point || '0' : '0')
            .toNumber(),
        };
        value = {
          ...value,
        } as IAmount;
        return value as IAmount;
      },
      {
        src20_point: 0,
        src20_amount: 0,
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

export default useFormatHoldingSWPSRC20;
