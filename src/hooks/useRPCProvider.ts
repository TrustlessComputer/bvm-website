import { isProduction } from '@/utils/common';
import { ethers } from 'ethers';

export const NOS_RPC_URL = isProduction()
  ? 'https://node.l2.trustless.computer'
  : 'https://l2-node.regtest.trustless.computer';

export const blockExplorer = isProduction()
  ? 'https://explorer.l2.trustless.computer/'
  : 'https://nos-explorer.regtest.trustless.computer/';

export const ProvidersFactory: Record<
  string,
  ethers.providers.JsonRpcProvider
> = {};

export const useRPCProvider = (rpcURL: string = NOS_RPC_URL) => {
  if (!ProvidersFactory[rpcURL]) {
    ProvidersFactory[rpcURL] = new ethers.providers.JsonRpcProvider(rpcURL);
  }
  return ProvidersFactory[rpcURL];
};
