import type { CustomChainConfig } from '@web3auth/base';
import { CHAIN_NAMESPACES } from '@web3auth/base';

import { isProduction } from '@/utils/common';

export const NOS_CHAIN_ID = isProduction() ? 23508 : 42070;

export const EAI_ID = isProduction() ? 45551 : 45551;

export const CHAIN_CONFIG = {
  mainnet: {
    displayName: 'Ethereum Mainnet',
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1',
    rpcTarget: `https://rpc.ankr.com/eth`,
    blockExplorer: 'https://etherscan.io/',
    ticker: 'ETH',
    tickerName: 'Ethereum',
  } as CustomChainConfig,
  solana: {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    rpcTarget: 'https://api.mainnet-beta.solana.com',
    blockExplorer: 'https://explorer.solana.com/',
    chainId: '0x1',
    displayName: 'Solana Mainnet',
    ticker: 'SOL',
    tickerName: 'Solana',
  } as CustomChainConfig,
  polygon: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: 'https://rpc.ankr.com/polygon',
    blockExplorer: 'https://polygonscan.com/',
    chainId: '0x89',
    displayName: 'Polygon Mainnet',
    ticker: 'matic',
    tickerName: 'Matic',
  } as CustomChainConfig,
  'polygon-mumbai': {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: 'https://rpc.ankr.com/polygon_mumbai',
    blockExplorer: 'https://mumbai.polygonscan.com/',
    chainId: '0x13881',
    displayName: 'Polygon Mumbai',
    ticker: 'matic',
    tickerName: 'Matic',
  } as CustomChainConfig,
  goerli: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: 'https://rpc.ankr.com/eth_goerli',
    blockExplorer: 'https://goerli.etherscan.io/',
    chainId: '0x5',
    displayName: 'Goerli',
    ticker: 'eth',
    tickerName: 'Eth',
  } as CustomChainConfig,
  arbitrum_sepolia: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget:
      'https://arbitrum-sepolia.infura.io/v3/4efda295156d477f959dcef8ebc33c5f',
    blockExplorer: 'https://sepolia.arbiscan.io/',
    chainId: '0x66eee',
    displayName: 'Arbitrum Sepolia',
    ticker: 'eth',
    tickerName: 'Eth',
  } as CustomChainConfig,
  tezos: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    displayName: 'Tezos Ithacanet',
  } as CustomChainConfig,
  nos: {
    displayName: isProduction() ? 'NOS' : 'NOS (Test)',
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: NOS_CHAIN_ID.toString(16),
    rpcTarget: isProduction()
      ? 'https://node.l2.trustless.computer'
      : 'https://l2-node.regtest.trustless.computer',
    blockExplorer: isProduction()
      ? 'https://explorer.l2.trustless.computer/'
      : 'https://nos-explorer.regtest.trustless.computer/',
    ticker: 'BVM',
    tickerName: 'BVM',
  } as CustomChainConfig,
  ai: {
    displayName: isProduction() ? 'EAI' : 'EAI (Test)',
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: EAI_ID.toString(16),
    rpcTarget: isProduction()
      ? 'https://testnet.eternalai.org/rpc'
      : 'https://testnet.eternalai.org/rpc',
    blockExplorer: isProduction()
      ? 'https://testnet.eternalai.org/'
      : 'https://testnet.eternalai.org/',
    ticker: 'EAI',
    tickerName: 'EAI',
  } as CustomChainConfig,
} as const;

export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG;
