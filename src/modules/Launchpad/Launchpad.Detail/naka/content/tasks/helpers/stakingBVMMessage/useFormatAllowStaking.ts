import { SignatureStatus } from '@/interfaces/whitelist';
import { stakingBVMSelector } from '@/stores/states/user/selector';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useSelector } from 'react-redux';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some(
      (item) =>
        item.status === 'unclaimed' && !!Number(item.staking_point || '0'),
    ),
    isClaimed: status.some((item) => item.status === 'done'),
  };
};

interface IAmount {
  staking_amount: number;
  staking_point: number;
  unClaimedPoint: number;
}

const useFormatAllowStaking = () => {
  const { loaded, status } = useSelector(stakingBVMSelector);
  const { isProcessing, isUnclaimed, isClaimed } = React.useMemo(() => {
    return checkIsAllowState(status);
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce(
      (prev, curr) => {
        let value = {
          staking_amount: new BigNumber(curr.staking_amount || '0')
            .plus(prev.staking_amount)
            .toNumber(),
          staking_point: new BigNumber(curr.staking_point || '0')
            .plus(prev.staking_point)
            .toNumber(),
          unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.staking_point || '0' : '0')
            .toNumber(),
        };
        value = {
          ...value,
        } as IAmount;
        return value as IAmount;
      },
      {
        staking_amount: 0,
        staking_point: 0,
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
    isClaimed,
  };
};

export default useFormatAllowStaking;
