import { BridgeToken, TokenType } from '@/modules/Bridge/types';
import { CHAIN_ID } from '@components/WagmiConnector/config';
import { CHAIN_TYPE } from '@constants/chains';

export const EAI_ADDRESS = {
  ETH: {
    token: '0xa84f95eb3DaBdc1bbD613709ef5F2fD42CE5bE8d',
    bridge: '0x532f0b30d65d9cfb01851184d9772c487dc6fbaa',
  },
  BASE: {
    token: '0x4b6bf1d365ea1a8d916da37fafd4ae8c86d061d7',
    bridge: '0x7b83bd1e07d3fdc2ee349306c92de0559b6a9c6e',
  },
  SOLANA: {
    token: '12KwPzKewFGgzs69pvHmUKvhiDBtkAFCKoNjv6344Rkm',
    bridge: '55QYAy5CvDMehVmduBbigxMnBTxQGDCj3YqhqpLffJWW',
  },
  AVALANCHE: {
    token: '0xe30f980a7ce39805fd2b75f34a8bef30b4c38859',
    bridge: '0x7b83bd1e07d3fdc2ee349306c92de0559b6a9c6e',
  },
  BSC: {
    token: '0x4b6bf1d365ea1a8d916da37fafd4ae8c86d061d7',
    bridge: '0x7b83bd1e07d3fdc2ee349306c92de0559b6a9c6e',
  },
  ARBITRUM: {
    token: '0xdb8c67e6ca293f43c75e106c70b97033cc2909e3',
    bridge: '0x4b6bf1d365ea1a8d916da37fafd4ae8c86d061d7',
  },
  ZKSYNC: {
    token: '0xf3ef1bd0368f5bf2769c70e3379cdb9caa09769a',
    bridge: '0xe77edeb0e1e0c8bb9f2bda2339e9dc127f99f2fb',
  },
  APE: {
    token: '0x4B6bF1d365ea1A8d916Da37FaFd4ae8C86d061D7',
    bridge: '',
  }
}

export const XRP_ADDRESS = {
  RIPPLE: {
    token: '0x0000000000000000000000000000000000000000',
    bridge: '0x0000000000000000000000000000000000000000-RIPPLE',
  },
  TC_RIPPLE: {
    token: '0x0000000000000000000000000000000000000000',
    bridge: '0x0000000000000000000000000000000000000000-RIPPLE-BVMs',
  },
}

const EAI_LOGO = 'https://eternalai.org/icons/tweets/ic_eai_white.svg';

export const EAI_ETHER: BridgeToken = {
  id: `EAI-${CHAIN_TYPE.ETHEREUM}`,
  name: 'Eternal AI',
  symbol: 'EAI',
  address: EAI_ADDRESS.ETH.token,
  decimals: 18,
  chainId: CHAIN_ID.ETH,
  logoURI: EAI_LOGO,
  tokenType: TokenType.EVM,
  network: {
    name: CHAIN_TYPE.ETHEREUM,
    chainId: CHAIN_ID.ETH,
    explorerUrl: 'https://etherscan.io/',
    logoURI: 'https://token-icons.s3.amazonaws.com/eth.png',
    displayName: 'Ethereum',
    nativeCurrency: {
      symbol: 'ETH',
    }
  },
  bridgeContractAddress: EAI_ADDRESS.ETH.bridge,
  tokenAddress: {
    [CHAIN_TYPE.BASE]: EAI_ADDRESS.BASE.token,
    [CHAIN_TYPE.SOLANA]: EAI_ADDRESS.SOLANA.token,
    [CHAIN_TYPE.AVALANCHE]: EAI_ADDRESS.AVALANCHE.token,
    [CHAIN_TYPE.BSC]: EAI_ADDRESS.BSC.token,
    [CHAIN_TYPE.ARBITRUM]: EAI_ADDRESS.ARBITRUM.token,
    [CHAIN_TYPE.ZKSYNC]: EAI_ADDRESS.ZKSYNC.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.BASE]: EAI_ADDRESS.BASE.bridge,
    [CHAIN_TYPE.SOLANA]: EAI_ADDRESS.SOLANA.bridge,
    [CHAIN_TYPE.AVALANCHE]: EAI_ADDRESS.AVALANCHE.bridge,
    [CHAIN_TYPE.BSC]: EAI_ADDRESS.BSC.bridge,
    [CHAIN_TYPE.ARBITRUM]: EAI_ADDRESS.ARBITRUM.bridge,
    [CHAIN_TYPE.ZKSYNC]: EAI_ADDRESS.ZKSYNC.bridge,
  },
}
export const EAI_BASE: BridgeToken = {
  id: `EAI-${CHAIN_TYPE.BASE}`,
  name: 'Eternal AI',
  symbol: 'EAI',
  address: EAI_ADDRESS.BASE.token,
  decimals: 18,
  chainId: CHAIN_ID.BASE,
  logoURI: EAI_LOGO,
  tokenType: TokenType.EVM,
  network: {
    name: CHAIN_TYPE.BASE,
    chainId: CHAIN_ID.BASE,
    explorerUrl: 'https://etherscan.io/',
    logoURI: 'https://eternalai.org/images/home-6-v2/base.png',
    displayName: 'Base',
    nativeCurrency: {
      symbol: 'ETH',
    }
  },
  bridgeContractAddress: EAI_ADDRESS.BASE.bridge,
  tokenAddress: {
    [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.bridge,
  },
}
export const EAI_SOLANA: BridgeToken = {
  id: `EAI-${CHAIN_TYPE.SOLANA}`,
  name: 'Eternal AI',
  symbol: 'EAI',
  address: EAI_ADDRESS.SOLANA.token,
  decimals: 18,
  chainId: CHAIN_ID.SOLANA,
  logoURI: EAI_LOGO,
  tokenType: TokenType.SOLANA,
  network: {
    name: CHAIN_TYPE.SOLANA,
    chainId: CHAIN_ID.SOLANA,
    explorerUrl: 'https://solscan.io/',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    displayName: 'Solana',
    nativeCurrency: {
      symbol: 'ETH',
    }
  },
  bridgeContractAddress: EAI_ADDRESS.SOLANA.bridge,
  tokenAddress: {},
  bridgeAddress: {},
}

export const EAI_AVAX: BridgeToken = {
  id: `EAI-${CHAIN_TYPE.AVALANCHE}`,
  name: 'Eternal AI',
  symbol: 'EAI',
  address: EAI_ADDRESS.AVALANCHE.token,
  decimals: 18,
  chainId: CHAIN_ID.AVALANCHE,
  logoURI: EAI_LOGO,
  tokenType: TokenType.EVM,
  network: {
    name: CHAIN_TYPE.AVALANCHE,
    chainId: CHAIN_ID.AVALANCHE,
    explorerUrl: 'https://etherscan.io/',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
    displayName: 'Avalanche',
    nativeCurrency: {
      symbol: 'AVAX',
    }
  },
  bridgeContractAddress: EAI_ADDRESS.AVALANCHE.bridge,
  tokenAddress: {
    [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.bridge,
  },
}

export const EAI_BSC: BridgeToken = {
  id: `EAI-${CHAIN_TYPE.BSC}`,
  name: 'Eternal AI',
  symbol: 'EAI',
  address: EAI_ADDRESS.BSC.token,
  decimals: 18,
  chainId: CHAIN_ID.BSC,
  logoURI: EAI_LOGO,
  tokenType: TokenType.EVM,
  network: {
    name: CHAIN_TYPE.BSC,
    chainId: CHAIN_ID.BSC,
    explorerUrl: 'https://etherscan.io/',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png',
    displayName: 'Binance Smart Chain',
    nativeCurrency: {
      symbol: 'BNB',
    }
  },
  bridgeContractAddress: EAI_ADDRESS.BSC.bridge,
  tokenAddress: {
    [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.bridge,
  },
}

export const EAI_ARBITRUM: BridgeToken = {
  id: `EAI-${CHAIN_TYPE.ARBITRUM}`,
  name: 'Eternal AI',
  symbol: 'EAI',
  address: EAI_ADDRESS.ARBITRUM.token,
  decimals: 18,
  chainId: CHAIN_ID.ARBITRUM,
  logoURI: EAI_LOGO,
  tokenType: TokenType.EVM,
  network: {
    name: CHAIN_TYPE.ARBITRUM,
    chainId: CHAIN_ID.ARBITRUM,
    explorerUrl: 'https://etherscan.io/',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png',
    displayName: 'Arbitrum',
    nativeCurrency: {
      symbol: 'ETH',
    }
  },
  bridgeContractAddress: EAI_ADDRESS.ARBITRUM.bridge,
  tokenAddress: {
    // [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.token,
  },
  bridgeAddress: {
    // [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.bridge,
  },
}

export const EAI_ZKSYNC: BridgeToken = {
  id: `EAI-${CHAIN_TYPE.ZKSYNC}`,
  name: 'Eternal AI',
  symbol: 'EAI',
  address: EAI_ADDRESS.ZKSYNC.token,
  decimals: 18,
  chainId: CHAIN_ID.ZKSYNC,
  logoURI: EAI_LOGO,
  tokenType: TokenType.EVM,
  network: {
    name: CHAIN_TYPE.ZKSYNC,
    chainId: CHAIN_ID.ZKSYNC,
    explorerUrl: 'https://explorer.zksync.io/',
    logoURI: 'icons/blockchains/ic_zksync.svg',
    displayName: 'zkSync Era',
    nativeCurrency: {
      symbol: 'ETH',
    }
  },
  bridgeContractAddress: EAI_ADDRESS.ZKSYNC.bridge,
  tokenAddress: {
    // [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.token,
  },
  bridgeAddress: {
    // [CHAIN_TYPE.ETHEREUM]: EAI_ADDRESS.ETH.bridge,
  },
}

export const XRP_RIPPLE: BridgeToken = {
  id: `XRM-${CHAIN_TYPE.RIPPLE}`,
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
    [CHAIN_TYPE.RIPPLE]: XRP_ADDRESS.RIPPLE.token,
  },
  bridgeAddress: {
    [CHAIN_TYPE.RIPPLE]: XRP_ADDRESS.RIPPLE.bridge,
  },
}

export const XRP_TC_RIPPLE: BridgeToken = {
  id: `XRM-${CHAIN_TYPE.RIPPLE}`,
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
  },
  bridgeAddress: {
  },
}

export const ConfigTokens: BridgeToken[] = [
  XRP_RIPPLE,
  XRP_TC_RIPPLE
  // EAI_ETHER,
  // EAI_BASE,
  // EAI_SOLANA,
  // EAI_ARBITRUM,
  // EAI_BSC,
  // EAI_ZKSYNC
  // EAI_AVAX,
];
