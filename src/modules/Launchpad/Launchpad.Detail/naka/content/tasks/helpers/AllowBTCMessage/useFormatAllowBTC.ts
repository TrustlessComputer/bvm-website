import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { SignatureStatus } from '@/interfaces/whitelist';
import { useSelector } from 'react-redux';
import { allowBTCSelector } from '@/stores/states/user/selector';
import { commonSelector } from '@/stores/states/common/selector';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some(
      (item) =>
        item.status === 'unclaimed' &&
        (!!Number(item.gas_point || '0') || !!Number(item.merlin_point || '0')),
    ),
  };
};

interface IAmount {
  txsCount: number;
  fee: number;
  point: number;
  merlin_amount: number;
  merlin_point: number;
  unClaimedPoint: number;
  unClaimedMerlinPoint: number;
  feeUSD: number;
  merlinAmountUSD: number;
}

const useFormatAllowBTC = () => {
  const { loaded, status } = useSelector(allowBTCSelector);
  const coinPrices = useSelector(commonSelector).coinPrices;
  const btcPrice = useMemo(() => coinPrices?.['BTC'] || '0', [coinPrices]);
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status);
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce(
      (prev, curr) => {
        let value = {
          txsCount: new BigNumber(curr.num_txs || '0')
            .plus(prev.txsCount)
            .toNumber(),
          fee: new BigNumber(curr.gas_amount || '0').plus(prev.fee).toNumber(),
          point: new BigNumber(curr.gas_point || '0')
            .plus(prev.point)
            .toNumber(),
          merlin_amount: new BigNumber(curr.merlin_amount || '0')
            .plus(prev.merlin_amount)
            .toNumber(),
          merlin_point: new BigNumber(curr.merlin_point || '0')
            .plus(prev.merlin_point)
            .toNumber(),
          unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.gas_point || '0' : '0')
            .toNumber(),
          unClaimedMerlinPoint: new BigNumber(prev.unClaimedMerlinPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.merlin_point || '0' : '0')
            .toNumber(),
        };
        value = {
          ...value,
          feeUSD: new BigNumber(value.fee || 0).times(btcPrice || 0).toNumber(),
          merlinAmountUSD: new BigNumber(value.merlin_amount || 0)
            .times(btcPrice || 0)
            .toNumber(),
        } as IAmount;
        return value as IAmount;
      },
      {
        txsCount: 0,
        fee: 0,
        point: 0,
        unClaimedPoint: 0,
        feeUSD: 0,
        merlin_amount: 0,
        merlin_point: 0,
        unClaimedMerlinPoint: 0,
        merlinAmountUSD: 0,
      } as IAmount,
    );
  }, [status, btcPrice]);

  return {
    loaded,
    status,
    isProcessing,
    amount,
    isUnclaimed:
      isUnclaimed &&
      (amount.unClaimedPoint || amount.unClaimedMerlinPoint) &&
      !isProcessing,
  };
};

export default useFormatAllowBTC;
