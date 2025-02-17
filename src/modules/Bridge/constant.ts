import { BridgeToken, TokenType } from '@/modules/Bridge/types';
import { CHAIN_ID } from '@components/WagmiConnector/config';
import { CHAIN_TYPE } from '@constants/chains';

export const XRP_ADDRESS = {
  RIPPLE: {
    token: 'native-ripple',
    bridge: '0x0000000000000000000000000000000000000000-RIPPLE',
  },
  TC_RIPPLE: {
    token: '0x0000000000000000000000000000000000000000',
    bridge: '0x7b83bd1e07d3fdc2ee349306c92de0559b6a9c6e',
  },
}

export const XRP_RIPPLE: BridgeToken = {
  id: `XRP-${CHAIN_TYPE.RIPPLE}`,
  name: 'Ripple',
  symbol: 'XRP',
  address: XRP_ADDRESS.RIPPLE.token,
  decimals: 18,
  chainId: CHAIN_ID.RIPPLE,
  logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  tokenType: TokenType.EVM,
  network: {
    name: CHAIN_TYPE.RIPPLE,
    chainId: CHAIN_ID.RIPPLE,
    explorerUrl: '',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
    displayName: 'Ripple',
    nativeCurrency: {
      symbol: 'XRP',
    }
  },
  bridgeContractAddress: XRP_ADDRESS.RIPPLE.bridge,
  tokenAddress: {
    [CHAIN_TYPE.TC_RIPPLE]: XRP_ADDRESS.TC_RIPPLE.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.TC_RIPPLE]: XRP_ADDRESS.TC_RIPPLE.bridge,
  },
}

export const XRP_TC_RIPPLE: BridgeToken = {
  id: `XRP-${CHAIN_TYPE.TC_RIPPLE}`,
  name: 'Ripple',
  symbol: 'XRP',
  address: XRP_ADDRESS.TC_RIPPLE.token,
  decimals: 18,
  chainId: CHAIN_ID.TC_RIPPLE,
  logoURI: "https://storage.googleapis.com/bvm-network/rvm/rvm_circle.png",
  tokenType: TokenType.EVM,
  network: {
    name: CHAIN_TYPE.TC_RIPPLE,
    chainId: CHAIN_ID.TC_RIPPLE,
    explorerUrl: '',
    logoURI: 'https://storage.googleapis.com/bvm-network/rvm/rvm_circle.png',
    displayName: 'RVM',
    nativeCurrency: {
      symbol: 'XRP',
    }
  },
  bridgeContractAddress: XRP_ADDRESS.TC_RIPPLE.bridge,
  tokenAddress: {
    [CHAIN_TYPE.RIPPLE]: XRP_ADDRESS.RIPPLE.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.RIPPLE]: XRP_ADDRESS.RIPPLE.bridge,
  },
}

export const ConfigTokens: BridgeToken[] = [
  XRP_RIPPLE,
  XRP_TC_RIPPLE
];
