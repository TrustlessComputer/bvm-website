import React from 'react';
import BigNumber from 'bignumber.js';
import { useAppSelector } from '@/stores/hooks';
import { allowBTCSelector } from '@/stores/states/user/selector';
import { SignatureStatus } from '@/interfaces/whitelist';
import { coinPricesSelector } from '@/stores/states/common/selector';
import { Coin } from '@/stores/states/common/types';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some(item => item.status === 'pending'),
    isUnclaimed: status.some(item => item.status === 'unclaimed' && !!Number(item.gas_point || '0'))
  }
}

interface IAmount {
  txsCount: number,
  fee: number,
  point: number,
  unClaimedPoint: number,
  feeUSD: number,
}

const useFormatAllowBTC = () => {
  const { loaded, status } = useAppSelector(allowBTCSelector);
  const btcPrice = useAppSelector(coinPricesSelector)?.[Coin.BTC];
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status)
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce((prev, curr)=> {
      let value = {
        txsCount: new BigNumber(curr.num_txs || '0').plus(prev.txsCount).toNumber(),
        fee: new BigNumber(curr.btc_fee || '0').plus(prev.fee).toNumber(),
        point: new BigNumber(curr.gas_point || '0').plus(prev.point).toNumber(),
        unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0').plus(curr.status === 'unclaimed' ? curr.gas_point || '0' : '0').toNumber(),
      };
      value = {
        ...value,
        feeUSD: new BigNumber(value.fee || 0).times(btcPrice || 0).toNumber()
      } as IAmount;
      return value as IAmount;
    }, { txsCount: 0, fee: 0, point: 0, unClaimedPoint: 0, feeUSD: 0 } as IAmount)
  }, [status, btcPrice]);

  return {
    loaded,
    status,
    isProcessing,
    amount,
    isUnclaimed
  }
};

export default useFormatAllowBTC;
