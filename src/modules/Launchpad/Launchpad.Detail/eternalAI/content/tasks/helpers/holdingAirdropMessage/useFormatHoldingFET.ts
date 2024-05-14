import React, { useMemo } from 'react';
import { SignatureStatus } from '@/interfaces/whitelist';
import { useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { holdingRNDRSelector } from '@/stores/states/user/selector';
import { commonSelector } from '@/stores/states/common/selector';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some((item) => item.status === 'unclaimed'),
  };
};

interface IAmount {
  fet_amount: number;
  fet_airdrop: number;
  unClaimedAirdrop: number;
}

const useFormatHoldingFET = () => {
  const { loaded, status } = useSelector(holdingRNDRSelector);
  const coinPrices = useSelector(commonSelector).coinPrices;
  const btcPrice = useMemo(() => coinPrices?.['BTC'] || '0', [coinPrices]);
  const { isProcessing, isUnclaimed } = React.useMemo(() => {
    return checkIsAllowState(status);
  }, [status]);

  const amount = React.useMemo<IAmount>(() => {
    return status.reduce(
      (prev, curr) => {
        let value = {
          fet_amount: new BigNumber(curr.fet_amount || '0')
            .plus(prev.fet_amount)
            .toNumber(),
          fet_airdrop: new BigNumber(curr.fet_airdrop || '0')
            .plus(prev.fet_airdrop)
            .toNumber(),
          unClaimedAirdrop: new BigNumber(prev.unClaimedAirdrop || '0')
            .plus(curr.status === 'unclaimed' ? curr.fet_airdrop || '0' : '0')
            .toNumber(),
        };
        value = {
          ...value,
        } as IAmount;
        return value as IAmount;
      },
      {
        fet_amount: 0,
        fet_airdrop: 0,
        unClaimedAirdrop: 0,
      } as IAmount,
    );
  }, [status, btcPrice]);

  return {
    loaded,
    status,
    isProcessing,
    amount,
    isUnclaimed: isUnclaimed && amount.unClaimedAirdrop && !isProcessing,
  };
};

export default useFormatHoldingFET;
