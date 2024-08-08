'use client';

import { useAppDispatch } from '@/stores/hooks';
import { OrderItem } from '@/stores/states/l2services/types';
import { PropsWithChildren, createContext, useMemo, useState } from 'react';

export const ChainContext = createContext<any>({});

export const ChainProvider = ({
  children,
  orderData,
}: {
  children?: any;
  orderData?: OrderItem;
}) => {
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<OrderItem | undefined>(orderData);

  const value = useMemo(
    () => ({
      order,
    }),
    [order, dispatch],
  );

  // console.log('ChainContext -- value -- ', value);

  return (
    <ChainContext.Provider value={value}>{children}</ChainContext.Provider>
  );
};
