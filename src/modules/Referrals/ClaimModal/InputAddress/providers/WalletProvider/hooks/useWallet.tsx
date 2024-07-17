import { useContext } from 'react';
import { WalletContext } from '../index';
import { IWalletContext } from '../types';

export function useWallet(): IWalletContext {
  const wallet = useContext(WalletContext);

  return wallet as IWalletContext;
}
