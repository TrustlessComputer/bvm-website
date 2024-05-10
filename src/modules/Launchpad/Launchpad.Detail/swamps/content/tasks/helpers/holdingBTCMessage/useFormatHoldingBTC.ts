import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { SignatureStatus } from '@/interfaces/whitelist';
import { useSelector } from 'react-redux';
import { holdingBTCSelector } from '@/stores/states/user/selector';
import { commonSelector } from '@/stores/states/common/selector';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some(
      (item) =>
        item.status === 'unclaimed' && !!Number(item.deposit_point || '0'),
    ),
  };
};

interface IAmount {
  deposit_amount: number;
  deposit_point: number;
  unClaimedPoint: number;
  depositAmountUSD: number;
}

const useFormatHoldingBTC = () => {
  const { loaded, status } = useSelector(holdingBTCSelector);
  const coinPrices = useSelector(commonSelector).coinPrices;
  const btcPrice = useMemo(() => coinPrices?.['BTC'] || '0', [coinPrices]);
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status);
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce(
      (prev, curr) => {
        let value = {
          deposit_amount: new BigNumber(curr.deposit_amount || '0')
            .plus(prev.deposit_amount)
            .toNumber(),
          deposit_point: new BigNumber(curr.deposit_point || '0')
            .plus(prev.deposit_point)
            .toNumber(),
          unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.deposit_point || '0' : '0')
            .toNumber(),
        };
        value = {
          ...value,
          depositAmountUSD: new BigNumber(value.deposit_amount || 0)
            .times(btcPrice || 0)
            .toNumber(),
        } as IAmount;
        return value as IAmount;
      },
      {
        deposit_amount: 0,
        deposit_point: 0,
        unClaimedPoint: 0,
        depositAmountUSD: 0,
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

export default useFormatHoldingBTC;
