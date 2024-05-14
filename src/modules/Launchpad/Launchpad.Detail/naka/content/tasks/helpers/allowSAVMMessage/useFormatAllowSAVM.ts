import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { SignatureStatus } from '@/interfaces/whitelist';
import { useSelector } from 'react-redux';
import { allowSAVMSelector } from '@/stores/states/user/selector';
import { commonSelector } from '@/stores/states/common/selector';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some((item) => item.status === 'unclaimed'),
  };
};

interface IAmount {
  txsCount: number;
  fee: number;
  point: number;
  savm_amount: number;
  savm_point: number;
  unClaimedPoint: number;
  unClaimedSAVMPoint: number;
  feeUSD: number;
  savmAmountUSD: number;
}

const useFormatAllowSAVM = () => {
  const { loaded, status } = useSelector(allowSAVMSelector);
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
          savm_amount: new BigNumber(curr.savm_amount || '0')
            .plus(prev.savm_amount)
            .toNumber(),
          savm_point: new BigNumber(curr.savm_point || '0')
            .plus(prev.savm_point)
            .toNumber(),
          unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.gas_point || '0' : '0')
            .toNumber(),
          unClaimedSAVMPoint: new BigNumber(prev.unClaimedSAVMPoint || '0')
            .plus(curr.status === 'unclaimed' ? curr.savm_point || '0' : '0')
            .toNumber(),
        };
        value = {
          ...value,
          feeUSD: new BigNumber(value.fee || 0).times(btcPrice || 0).toNumber(),
          savmAmountUSD: new BigNumber(value.savm_amount || 0)
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
        savm_amount: 0,
        savm_point: 0,
        unClaimedSAVMPoint: 0,
        savmAmountUSD: 0,
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
      (amount.unClaimedPoint || amount.unClaimedSAVMPoint) &&
      !isProcessing,
  };
};

export default useFormatAllowSAVM;
