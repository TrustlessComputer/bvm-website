'use client';

import { useContext } from 'react';
import { BuyContext } from './Buy.context';
import { IBuyContext } from './Buy.type';

export const useBuy = (): IBuyContext => {
  const context = useContext(BuyContext);
  if (!context) {
    throw new Error(
      'BuyContext not found, useBuy must be used within the BuyProvider',
    );
  }
  return context;
};
