import { ethers } from 'ethers';

const CHAIN_ID = 70683;

// https://docs.metamask.io/wallet/reference/wallet_addethereumchain/
export const HACKATHON_NETWORK = {
  chainId: ethers.utils.hexValue(CHAIN_ID),
  chainName: 'POC Chain',
  rpcUrls: ['https://rpc.poc-chain.l2aas.com'],
  blockExplorerUrls: ['https://explorer.poc-chain.l2aas.com'],
  nativeCurrency: {
    name: 'POC',
    symbol: 'POC',
    decimals: 18,
  },
};

console.log('HACKATHON_NETWORK', HACKATHON_NETWORK);
