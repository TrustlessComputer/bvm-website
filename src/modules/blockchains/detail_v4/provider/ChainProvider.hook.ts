'use client';

import { useContext } from 'react';
import { IChainProvider } from './ChainProvider.types';
import { ChainContext } from './ChainProvider';

export const useChainProvider = (): IChainProvider => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error(
      'ChainContext not found, useChainProvider must be used within the ChainProvider',
    );
  }
  return context;
};
