import React from 'react';
import BigNumber from 'bignumber.js';
import { useAppSelector } from '@/stores/hooks';
import { allowCelestiaSelector } from '@/stores/states/user/selector';
import { SignatureStatus } from '@/interfaces/whitelist';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some(item => item.status === 'pending'),
    isUnclaimed: status.some(item => item.status === 'unclaimed')
  }
}

interface IAmount {
  txsCount: number,
  point: number,
  unClaimedPoint: number,
  celestiaAmount: number,
  eigenlayerAmount: number
  polygonAmount: number
}

const INIT_DATA = {
  txsCount: 0,
  point: 0,
  unClaimedPoint: 0,
  celestiaAmount: 0,
  eigenlayerAmount: 0,
  polygonAmount: 0
}

const useFormatAllowCelestia = () => {
  const { loaded, status } = useAppSelector(allowCelestiaSelector);
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status)
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce((prev, curr)=> {
      let value = {
        txsCount: new BigNumber(curr.num_txs || '0').plus(prev.txsCount).toNumber(),
        celestiaAmount: new BigNumber(curr.btc_fee || '0').plus(prev.celestiaAmount).toNumber(),
        eigenlayerAmount: new BigNumber(curr.eigenlayer_amount || '0').plus(prev.eigenlayerAmount).toNumber(),
        polygonAmount: new BigNumber(curr.polygon_amount || '0').plus(prev.polygonAmount).toNumber(),
        point: new BigNumber(curr.gas_point || '0').plus(prev.point).toNumber(),
        unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
          .plus(curr.status === 'unclaimed' ? curr.gas_point || '0' : '0')
          .plus(curr.status === 'unclaimed' ? curr.eigenlayer_point || '0' : '0')
          .plus(curr.status === 'unclaimed' ? curr.polygon_point || '0' : '0')
          .toNumber(),
      };
      return value as IAmount;
    }, { ...INIT_DATA } as IAmount)
  }, [status]);

  return {
    loaded,
    status,
    isProcessing,
    amount,
    isUnclaimed: isUnclaimed && amount.unClaimedPoint && !isProcessing
  }
};

export default useFormatAllowCelestia;
