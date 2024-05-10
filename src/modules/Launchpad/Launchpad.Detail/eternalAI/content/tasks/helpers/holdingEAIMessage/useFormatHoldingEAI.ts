import React from 'react';
import BigNumber from 'bignumber.js';
import { SignatureStatus } from '@/interfaces/whitelist';
import { holdingEAISelector } from '@/stores/states/user/selector';
import { useSelector } from 'react-redux';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some(
      (item) =>
        item.status === 'unclaimed' && !!Number(item.testnet_point || '0'),
    ),
  };
};

interface IAmount {
  testnet_point: number;
  unClaimedPoint: number;
}

const useFormatHoldingEAI = () => {
  const { loaded, status } = useSelector(holdingEAISelector);
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status);
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce(
      (prev, curr) => {
        let value = {
          testnet_point: new BigNumber(curr.testnet_point || '0')
            .plus(prev.testnet_point)
            .toNumber(),
          unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.testnet_point || '0' : '0')
            .toNumber(),
        };
        value = {
          ...value,
        } as IAmount;
        return value as IAmount;
      },
      {
        testnet_point: 0,
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

export default useFormatHoldingEAI;
