import { SignatureStatus } from '@/interfaces/whitelist';
import { commonSelector } from '@/stores/states/common/selector';
import { holdingRNDRSelector } from '@/stores/states/user/selector';
import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some((item) => item.status === 'pending'),
    isUnclaimed: status.some((item) => item.status === 'unclaimed'),
  };
};

interface IAmount {
  render_amount: number;
  render_airdrop: number;
  unClaimedAirdrop: number;
}

const useFormatHoldingRNDR = () => {
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
          render_amount: new BigNumber(curr.render_amount || '0')
            .plus(prev.render_amount)
            .toNumber(),
          render_airdrop: new BigNumber(curr.render_airdrop || '0')
            .plus(prev.render_airdrop)
            .toNumber(),
          unClaimedAirdrop: new BigNumber(prev.unClaimedAirdrop || '0')
            .plus(
              curr.status === 'unclaimed' ? curr.render_airdrop || '0' : '0',
            )
            .toNumber(),
        };
        value = {
          ...value,
        } as IAmount;
        return value as IAmount;
      },
      {
        render_amount: 0,
        render_airdrop: 0,
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

export default useFormatHoldingRNDR;
