'use client';

import { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  useAuthenticatedAddress,
  useAuthenticatedUserInfo,
  useAuthenticatedWallet,
} from './hooks';
import { formatAmountFromChain } from '@/utils/number';
import { setWalletBalance } from '@/stores/states/auth/reducer';

const LOAD_BALANCE_INTERVAL_TIMER = 6000; // only Layer 2!

const BalanceUpdater = () => {
  const dispatch = useDispatch();

  const wallet = useAuthenticatedWallet();
  const address = useAuthenticatedAddress();
  const userInfo = useAuthenticatedUserInfo();
  const isLogged = !!userInfo;

  const timerRef = useRef<any>();

  const clearTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  const fetchBalance = async () => {
    let balance = '0';
    try {
      console.log('[fetchBalance] Params --- : ', {
        address,
        wallet,
        provider: wallet?.provider,
        userInfo,
      });

      if (!wallet || !userInfo || !address || !wallet.provider || !isLogged) {
        balance = '0';
      } else {
        balance = (await wallet.provider?.getBalance(address))?.toString();
      }
      balance = formatAmountFromChain(balance, 18);
    } catch (error) {
      console.log('walletBalance --- ERROR: ', error);
    } finally {
      console.log('Balance : ', balance);
      dispatch(setWalletBalance(balance));
    }

    return balance;
  };

  useEffect(() => {
    clearTimer();
    if (isLogged) {
      timerRef.current = setInterval(() => {
        fetchBalance();
      }, LOAD_BALANCE_INTERVAL_TIMER);
    }
    return () => {
      clearTimer();
    };
  }, [wallet, address, userInfo, isLogged]);

  useEffect(() => {
    fetchBalance();
  }, [wallet, address, userInfo, isLogged]);

  return null;
};

export default memo(BalanceUpdater);
