'use client';

import { useDebounce } from '@/hooks/useDebounce';
import {
  IAssetsContext,
  INITIAL_BALANCE,
} from '@/Providers/AssetsProvider/types';
import { authWalletSelector } from '@/stores/states/auth/selector';
import { commonSelector } from '@/stores/states/common/selector';
import { formatEther, parseEther } from 'ethers/lib/utils';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialValue: IAssetsContext = {
  balance: {
    ...INITIAL_BALANCE,
  },
  isFetchedBalance: false,
};

export const AssetsContext = React.createContext<IAssetsContext>(initialValue);

const AssetsProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const dispatch = useDispatch();
  const wallet = useSelector(authWalletSelector);
  const needReload = useSelector(commonSelector).needReload;
  const needReloadDebounced = useDebounce(needReload, 1000);
  const [isFetchedBalance, setIsFetchBalance] = useState(false);

  const [balance, setBalance] = React.useState({
    ...INITIAL_BALANCE,
  });

  useEffect(() => {
    onLoadBalance();
  }, [wallet?.address, needReloadDebounced]);

  const onLoadBalance = async () => {
    try {
      if (!wallet?.provider || !wallet?.address) return;
      const [balance] = await Promise.all([
        wallet.provider.getBalance(wallet.address),
      ]);

      const balanceBTC = '0';

      setBalance({
        amount: balance.toString(),
        isLoaded: true,
        amountFormated: formatEther(balance.toString()),
        amountBTCFormatted: balanceBTC,
        amountBTC: parseEther(balanceBTC).toString(),
      });
    } catch (e) {
      console.log('onLoadBalance', e);
      setBalance({
        amount: '0',
        isLoaded: true,
        amountFormated: '0',
        amountBTC: '0',
        amountBTCFormatted: '0',
      });
    } finally {
      setIsFetchBalance(true);
    }
  };

  const values = useMemo((): IAssetsContext => {
    return {
      balance: balance,
      isFetchedBalance,
    };
  }, [balance, isFetchedBalance]);

  return (
    <AssetsContext.Provider value={values}>{children}</AssetsContext.Provider>
  );
};

export default AssetsProvider;
