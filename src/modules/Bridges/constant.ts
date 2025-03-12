import { BridgeToken, TokenType, BridgeNetwork } from '@/modules/Bridges/types';
import { CHAIN_ID } from '@components/WagmiConnector/config';
import { CHAIN_TYPE } from '@constants/chains';

export const DOGE_NETWORK: BridgeNetwork = {
  name: CHAIN_TYPE.DOGE,
  chainId: CHAIN_ID.DOGE,
  explorerUrl: '',
  logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
  displayName: 'Doge',
  nativeCurrency: {
    symbol: 'DOGE',
  },
};

export const TC_DOGE_NETWORK: BridgeNetwork = {
  name: CHAIN_TYPE.TC_DOGE,
  chainId: CHAIN_ID.TC_DOGE_CHAIN_ID,
  explorerUrl: 'https://explorer.tc-doge.trustless.computer',
  logoURI: 'https://storage.googleapis.com/bvm-network/dvm/dvm-logo.png', // TO DO 1
  displayName: 'DVM',
  nativeCurrency: {
    symbol: 'DOGE',
  },
};

export const RIIPLE_NETWORK: BridgeNetwork = {
  name: CHAIN_TYPE.RIPPLE,
  chainId: CHAIN_ID.RIPPLE,
  explorerUrl: '',
  logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
  displayName: 'Ripple',
  nativeCurrency: {
    symbol: 'XRP',
  },
};

export const TC_RIPPLE_NETWORK: BridgeNetwork = {
  name: CHAIN_TYPE.TC_RIPPLE,
  chainId: CHAIN_ID.TC_RIPPLE,
  explorerUrl: '',
  logoURI: 'https://storage.googleapis.com/bvm-network/rvm/rvm_circle.png',
  displayName: 'RVM',
  nativeCurrency: {
    symbol: 'XRP',
  },
};

export const XRP_ADDRESS = {
  RIPPLE: {
    token: 'native-ripple',
    bridge: '0x0000000000000000000000000000000000000000-RIPPLE',
  },
  TC_RIPPLE: {
    token: '0x0000000000000000000000000000000000000000',
    bridge: '0x7b83bd1e07d3fdc2ee349306c92de0559b6a9c6e',
  },
};

export const DOGE_ADDRESS = {
  DOGE: {
    token: 'native-doge',
    bridge: '0x0000000000000000000000000000000000000000-DVM',
  },
  TC_DOGE: {
    token: '0x0000000000000000000000000000000000000000',
    bridge: '0x7b83bd1e07d3fdc2ee349306c92de0559b6a9c6e', // TO DO 1
  },
};

export const DOGE_DOGECOIN: BridgeToken = {
  id: `DOGE-${CHAIN_TYPE.DOGE}`,
  name: 'Doge',
  symbol: 'DOGE',
  address: DOGE_ADDRESS.DOGE.token,
  decimals: 18,
  chainId: CHAIN_ID.DOGE,
  logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
  tokenType: TokenType.DOGE,
  network: DOGE_NETWORK,
  bridgeContractAddress: DOGE_ADDRESS.DOGE.bridge,
  tokenAddress: {
    [CHAIN_TYPE.TC_DOGE]: DOGE_ADDRESS.TC_DOGE.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.TC_DOGE]: DOGE_ADDRESS.TC_DOGE.bridge,
  },
};

export const DOGE_TC_DOGECOIN: BridgeToken = {
  id: `DOGE-${CHAIN_TYPE.TC_DOGE}`,
  name: 'DVM',
  symbol: 'DVM',
  address: DOGE_ADDRESS.TC_DOGE.token,
  decimals: 18,
  chainId: CHAIN_ID.TC_DOGE_CHAIN_ID,
  logoURI: 'https://storage.googleapis.com/bvm-network/dvm/dvm-logo.png', // TO DO 1
  tokenType: TokenType.EVM,
  network: TC_DOGE_NETWORK,
  bridgeContractAddress: DOGE_ADDRESS.TC_DOGE.bridge,
  tokenAddress: {
    [CHAIN_TYPE.DOGE]: DOGE_ADDRESS.DOGE.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.DOGE]: DOGE_ADDRESS.DOGE.bridge,
  },
};

export const XRP_RIPPLE: BridgeToken = {
  id: `XRP-${CHAIN_TYPE.RIPPLE}`,
  name: 'Ripple',
  symbol: 'XRP',
  address: XRP_ADDRESS.RIPPLE.token,
  decimals: 18,
  chainId: CHAIN_ID.RIPPLE,
  logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
  tokenType: TokenType.RIPPLE,
  network: RIIPLE_NETWORK,
  bridgeContractAddress: XRP_ADDRESS.RIPPLE.bridge,
  tokenAddress: {
    [CHAIN_TYPE.TC_RIPPLE]: XRP_ADDRESS.TC_RIPPLE.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.TC_RIPPLE]: XRP_ADDRESS.TC_RIPPLE.bridge,
  },
};

export const XRP_TC_RIPPLE: BridgeToken = {
  id: `XRP-${CHAIN_TYPE.TC_RIPPLE}`,
  name: 'Ripple',
  symbol: 'RVM',
  address: XRP_ADDRESS.TC_RIPPLE.token,
  decimals: 18,
  chainId: CHAIN_ID.TC_RIPPLE,
  logoURI: 'https://storage.googleapis.com/bvm-network/rvm/rvm_circle.png',
  tokenType: TokenType.EVM,
  network: TC_RIPPLE_NETWORK,
  bridgeContractAddress: XRP_ADDRESS.TC_RIPPLE.bridge,
  tokenAddress: {
    [CHAIN_TYPE.RIPPLE]: XRP_ADDRESS.RIPPLE.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.RIPPLE]: XRP_ADDRESS.RIPPLE.bridge,
  },
};

export const ConfigTokens: BridgeToken[] = [
  XRP_RIPPLE,
  XRP_TC_RIPPLE,
  DOGE_DOGECOIN,
  DOGE_TC_DOGECOIN,
];
