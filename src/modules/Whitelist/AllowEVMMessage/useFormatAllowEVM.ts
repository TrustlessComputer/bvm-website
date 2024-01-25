import React from 'react';
import BigNumber from 'bignumber.js';
import { useAppSelector } from '@/stores/hooks';
import { allowEVMSelector } from '@/stores/states/user/selector';
import { IAllowEVMProps } from '@/modules/Whitelist/AllowEVMMessage/type';
import { SignatureStatus } from '@/interfaces/whitelist';

const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some(item => item.status === 'pending'),
    isUnclaimed: status.some(item => item.status === 'unclaimed')
  }
};

interface IAmount {
  txsCount: number,
  fee: number,
  point: number,
  unClaimedPoint: number,
  blastAmount: number,
  baseAmount: number,
  arbAmount: number,
  polygonAmount: number,
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
        baseAmount: new BigNumber(curr.base_amount || '0').plus(prev.baseAmount).toNumber(),
        arbAmount: new BigNumber(curr.arb_amount || '0').plus(prev.arbAmount).toNumber(),
        polygonAmount: new BigNumber(curr.polygon_amount || '0').plus(prev.polygonAmount).toNumber(),
        point: new BigNumber(curr.gas_point || '0')
          .plus(prev.point)
          .plus(curr.blast_point || '0')
          .plus(curr.arb_point || '0')
          .plus(curr.base_point || '0')
          .plus(curr.polygon_point || '0')
          .toNumber(),
        unClaimedPoint: new BigNumber(prev.unClaimedPoint || '0')
          .plus(curr.status === 'unclaimed' ? curr.gas_point || '0' : '0')
          .plus(curr.status === 'unclaimed' ? curr.blast_point || '0' : '0')
          .plus(curr.status === 'unclaimed' ? curr.arb_point || '0' : '0')
          .plus(curr.status === 'unclaimed' ? curr.base_point || '0' : '0')
          .plus(curr.status === 'unclaimed' ? curr.polygon_point || '0' : '0')
          .toNumber(),
      };
      return value as IAmount;
    }, { txsCount: 0, fee: 0, point: 0, unClaimedPoint: 0, feeUSD: 0, blastAmount: 0, baseAmount: 0, arbAmount: 0, polygonAmount: 0 } as IAmount)
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
