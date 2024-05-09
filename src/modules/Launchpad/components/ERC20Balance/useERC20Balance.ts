import { commonSelector } from '@/stores/states/common/selector';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IToken } from './types';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
export interface IProps {
  token?: IToken | undefined;
  onBalanceChange?: (_amount: string | undefined) => void;
}

const useERC20Balance = (props: IProps) => {
  const { token, onBalanceChange } = props;
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [balance, setBalance] = useState('0');
  const needReload = useSelector(commonSelector).needReload;
  // const playerShareContract = useTradeKey().playerShareContract;
  const wallet = useAuthenticatedWallet();
  const address = wallet?.address;

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const tokenBalance = await getTokenBalance(token);
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

  const getTokenBalance = async (token: IToken | undefined) => {
    if (!token) return '0';
    try {
      // const response = await playerShareContract.getTokenBalance(token.address);
      const response = '0';
      return response || '0';
    } catch (error) {
      console.log('error', error);
      // throw error;
      return '0';
    }
  };

  useEffect(() => {
    if (token?.address && wallet?.privateKey) {
      fetchBalance();
    } else {
      setLoaded(true);
    }
  }, [token?.address, needReload, address, wallet?.privateKey]);

  return {
    loading,
    balance,
    loaded,
  };
};

export default useERC20Balance;
