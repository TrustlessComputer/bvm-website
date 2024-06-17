'use client';

import { useContext } from 'react';
import { IWeb3AuthContext } from './Web3Auth.types';
import { Web3AuthContext } from './Web3AuthProvider';

export const useWeb3Auth = (): IWeb3AuthContext => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error(
      'Web3AuthContext not found, useWeb3Auth must be used within the Web3AuthProvider',
    );
  }
  return context;
};
