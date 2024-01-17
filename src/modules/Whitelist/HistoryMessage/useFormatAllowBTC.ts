import React from 'react';
import BigNumber from 'bignumber.js';
import { useAppSelector } from '@/stores/hooks';
import { allowBTCSelector } from '@/stores/states/user/selector';

const useFormatAllowBTC = () => {
  const { loaded, status } = useAppSelector(allowBTCSelector);
  const isProcessing = React.useMemo(() => {
    return status.some(item => item.status === 'pending')
  }, [status]);

  const amount = React.useMemo(() => {
    return status.reduce((prev, curr)=> {
      return {
        txsCount: new BigNumber(curr.num_txs || '0').plus(prev.txsCount).toNumber(),
        fee: new BigNumber(curr.btc_fee || '0').plus(prev.fee).toNumber(),
        point: new BigNumber(curr.gas_point || '0').plus(prev.point).toNumber()
      }
    }, { txsCount: 0, fee: 0, point: 0 } as any)
  }, [status]);


  return {
    loaded,
    status,
    isProcessing,
    amount
  }
};

export default useFormatAllowBTC;
