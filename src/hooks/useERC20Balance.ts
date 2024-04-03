import { useEffect, useState } from 'react';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import { isNativeToken } from '@constants/token';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { getProvider } from '@/contract/utils/RPC';
import CContract from '@/contract/contract';

export interface IProps {
  tokenAddress: string;
  onBalanceChange?: (_amount: string | undefined) => void;
}

const useERC20Balance = (props: IProps) => {
  const { tokenAddress, onBalanceChange } = props;
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [balance, setBalance] = useState('0');
  const needReload = useAppSelector(commonSelector).needReload;
  const address = useAppSelector(nakaAddressSelector);

  const contract = new CContract();

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

  const getTokenBalance = async (tokenAddress: string) => {
    if (!tokenAddress) return '0';
    try {
      const provider = getProvider('NAKA');
      if (isNativeToken(tokenAddress)) {
        const balance = await provider.getBalance(address);
        return formatEther(balance).toString();
      }
      const balance = await contract
        .getERC20Contract({ contractAddress: tokenAddress })
        .connect(address)
        .balanceOf(address);

      return formatEther(balance).toString() || '0';
    } catch (error) {
      console.log('error', error);
      // throw error;
      return '0';
    }
  };

  useEffect(() => {
    if (tokenAddress && address) {
      fetchBalance();
    } else {
      setLoaded(true);
    }
  }, [tokenAddress, needReload, address]);

  return {
    loading,
    balance,
    loaded,
  };
};

export default useERC20Balance;
