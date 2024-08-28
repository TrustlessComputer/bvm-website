'use client';

import { useAppDispatch } from '@/stores/hooks';
import { OrderItem } from '@/stores/states/l2services/types';
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IChainProvider } from './ChainProvider.types';
import { getChainIDRandom } from '../../Buy/Buy.helpers';

export const ChainContext = createContext<IChainProvider>({
  order: undefined,
  chainID: undefined,
});

export const ChainProvider = ({
  children,
  orderData,
}: {
  children?: any;
  orderData?: OrderItem;
}) => {
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<OrderItem | undefined>(orderData);
  const [chainID, setChainID] = useState<number | undefined>(undefined);

  const getChainIDRandomHandler = async () => {
    const chainID = await getChainIDRandom();
    setChainID(chainID);
  };

  useEffect(() => {
    setOrder(orderData);
    if (orderData?.chainId) {
      setChainID(Number(orderData?.chainId));
    }
  }, [orderData]);

  useEffect(() => {
    getChainIDRandomHandler();
  }, []);

  const value = useMemo(
    () => ({
      order,
      chainID,
    }),
    [order, chainID, dispatch],
  );

  // console.log('ChainContext -- value -- ', value);

  return (
    <ChainContext.Provider value={value}>{children}</ChainContext.Provider>
  );
};
