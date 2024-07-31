import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { OrderItem } from '@/stores/states/l2services/types';
import { useMemo } from 'react';

export const useOrderOwnerHelper = (order?: OrderItem) => {
  const { l2ServiceUserAddress, loggedIn } = useWeb3Auth();

  const result = useMemo(() => {
    let isOwner =
      l2ServiceUserAddress?.toLowerCase() === order?.tcAddress?.toLowerCase();

    return {
      isOwner,
      l2ServiceUserAddress,
      loggedIn,
    };
  }, [order, l2ServiceUserAddress, loggedIn]);

  return result;
};
