'use client';

import { IToken } from '@/services/api/dapp/token_generation/interface';
import { useAppDispatch } from '@/stores/hooks';
import { OrderItem } from '@/stores/states/l2services/types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { getChainIDRandom } from '../../Buy/Buy.helpers';
import { IChainProvider } from './ChainProvider.types';

export const ChainContext = createContext<IChainProvider>({
  order: undefined,
  chainID: undefined,
  tokenIssueList: [],
});

export const ChainProvider = ({
  children,
  orderData,
  tokenIssueListData,
}: {
  children?: any;
  orderData?: OrderItem;
  tokenIssueListData?: IToken[];
}) => {
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<OrderItem | undefined>(orderData);
  const [chainID, setChainID] = useState<number | undefined>(undefined);
  const [tokenIssueList, setTokenIssueList] = useState<IToken[]>(
    tokenIssueListData || [],
  );

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
    setTokenIssueList(tokenIssueListData || []);
  }, [tokenIssueListData]);

  useEffect(() => {
    getChainIDRandomHandler();
  }, []);

  const value = useMemo(
    () => ({
      order,
      chainID,
      tokenIssueList,
    }),
    [order, chainID, tokenIssueList, dispatch],
  );

  // console.log('ChainContext -- value -- ', value);

  return (
    <ChainContext.Provider value={value}>{children}</ChainContext.Provider>
  );
};
