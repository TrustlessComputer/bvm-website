'use client';

import CTokenContract from '@/contract/token/CTokenVer2';
import { commonSelector } from '@/stores/states/common/selector';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
import { ChainID } from '@constants/chains';

export interface IProps {
  tokenAddress?: string;
  onBalanceChange?: (_amount: string | undefined) => void;
  chainId?: ChainID;
  walletAddress?: string;
}

const useERC20Balance = (props: IProps) => {
  const { tokenAddress, onBalanceChange, chainId, walletAddress } = props;
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [balance, setBalance] = useState('0');
  const needReload = useSelector(commonSelector).needReload;
  const { latestAddress } = useWagmiContext();
  const address = latestAddress;
  const cTokenContract = useRef(new CTokenContract()).current;

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const tokenBalance = await getTokenBalance(tokenAddress);
      setBalance(tokenBalance || '0');

      onBalanceChange && onBalanceChange(tokenBalance);
    } catch (error) {
      setLoading(false);
      setLoaded(true);
      throw error;
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  const getTokenBalance = async (tokenAddress: string | undefined) => {
    if (!tokenAddress) return '0';
    try {
      const response = await cTokenContract.getTokenBalance(
        tokenAddress,
        chainId,
        walletAddress,
      );

      return response || '0';
    } catch (error) {
      console.log('error', error);
      // throw error;
      return '0';
    }
  };

  useEffect(() => {
    if (tokenAddress) {
      fetchBalance();
    } else {
      setLoaded(true);
    }
  }, [tokenAddress, needReload, address, chainId, walletAddress]);

  return {
    loading,
    balance,
    loaded,
  };
};

export default useERC20Balance;
