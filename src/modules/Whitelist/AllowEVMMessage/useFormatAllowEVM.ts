import React from 'react';
import BigNumber from 'bignumber.js';
import { useAppSelector } from '@/stores/hooks';
import { allowEVMSelector } from '@/stores/states/user/selector';
import { checkIsAllowState } from '@/modules/Whitelist/utils';
import { IAllowEVMProps } from '@/modules/Whitelist/AllowEVMMessage/type';

interface IAmount {
  txsCount: number,
  fee: number,
  point: number,
  unClaimedPoint: number,
  feeUSD: number,
  blastAmount: number,
}

const useFormatAllowEVM = ({ type }: IAllowEVMProps) => {
  const { loaded, status } = useAppSelector(allowEVMSelector)(type);
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status)
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce((prev, curr)=> {
      let value = {
        txsCount: new BigNumber(curr.num_txs || '0').plus(prev.txsCount).toNumber(),
        fee: new BigNumber(curr.btc_fee || '0').plus(prev.fee).toNumber(),
        blastAmount: new BigNumber(curr.blast_amount || '0').plus(prev.blastAmount).toNumber(),
        point: new BigNumber(curr.gas_point || '0').plus(curr.blast_point || '0').plus(prev.point).toNumber(),
        unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
          .plus(curr.status === 'unclaimed' ? curr.gas_point || '0' : '0')
          .plus(curr.status === 'unclaimed' ? curr.blast_point || '0' : '0')
          .toNumber(),
      };
      value = {
        ...value,
        // TODO: PRICE
        feeUSD: new BigNumber(value.fee || 0).times(1).toNumber()
      } as IAmount;
      return value as IAmount;
    }, { txsCount: 0, fee: 0, point: 0, unClaimedPoint: 0, feeUSD: 0, blastAmount: 0 } as IAmount)
  }, [status]);

  return {
    loaded,
    status,
    isProcessing,
    amount,
    isUnclaimed: isUnclaimed && amount.unClaimedPoint && !isProcessing
  }
};

export default useFormatAllowEVM;
