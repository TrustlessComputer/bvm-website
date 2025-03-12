import { http, createConfig } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  avalanche,
  bsc,
  zksync,
  apeChain,
} from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';
import { Chain, defineChain } from 'viem';

export const ARBITRUM_CHAIN_ID_2 = 222671;

export const ARBITRUM_CHAIN_ID = arbitrum.id;
export const BASE_CHAIN_ID = base.id;
export const ETH_CHAIN_ID = mainnet.id;
export const AVAX_CHAIN_ID = avalanche.id;
export const BSC_CHAIN_ID = bsc.id;
export const ETERNAL_CHAIN_ID = 43338;
export const ZKSYNC_CHAIN_ID = zksync.id;
export const APE_CHAIN_ID = apeChain.id;

export const RIPPLE_CHAIN_ID = 4444444;
export const TC_RIPPLE_CHAIN_ID = 62268; //L2

export const DOGE_CHAIN_ID = 33334;
export const TC_DOGE_CHAIN_ID = 64468; //L2

export const CHAIN_ID = {
  ARBITRUM: ARBITRUM_CHAIN_ID,
  BASE: BASE_CHAIN_ID,
  ETH: ETH_CHAIN_ID,
  SOLANA: 1111,
  AVALANCHE: AVAX_CHAIN_ID,
  BSC: BSC_CHAIN_ID,
  ETERNAL: ETERNAL_CHAIN_ID,
  ZKSYNC: ZKSYNC_CHAIN_ID,
  APE: APE_CHAIN_ID,

  TC_RIPPLE: TC_RIPPLE_CHAIN_ID,
  RIPPLE: RIPPLE_CHAIN_ID,

  DOGE: DOGE_CHAIN_ID,
  TC_DOGE_CHAIN_ID: TC_DOGE_CHAIN_ID,
};

export const eternal = {
  id: ETERNAL_CHAIN_ID,
  name: 'EternalAI',
  network: 'EternalAI',
  nativeCurrency: { name: 'EAI', symbol: 'EAI', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://node.eternalai.org'] },
    public: { http: ['https://node.eternalai.org'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.eternalai.org' },
  },
} as Chain;

export const tcRipple = {
  id: CHAIN_ID.TC_RIPPLE,
  name: 'RVM',
  network: 'RVM',
  nativeCurrency: { name: 'XRP', symbol: 'XRP', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rvm.bvm.network'] },
    public: { http: ['https://rvm.bvm.network'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.rvm.bvm.network' },
  },
};

export const tcDoge = {
  id: CHAIN_ID.TC_DOGE_CHAIN_ID,
  name: 'DVM',
  network: 'DVM',
  nativeCurrency: { name: 'Doge', symbol: 'DOGE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://tc-doge.trustless.computer'] },
    public: { http: ['https://tc-doge.trustless.computer'] },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer.tc-doge.trustless.computer',
    },
  },
};

export const configWagmiChains = [
  base,
  arbitrum,
  mainnet,
  avalanche,
  bsc,
  eternal,
  apeChain,
  tcRipple,
  tcDoge,
] as Chain[];

export const wagmiConfig = createConfig({
  chains: configWagmiChains as any,
  transports: {
    [base.id]: http(),
    [arbitrum.id]: http(),
    [mainnet.id]: http(),
    [avalanche.id]: http(),
    [bsc.id]: http(),
    [eternal.id]: http(),
    // [sepolia.id]: http(),
    [zksync.id]: http(),
    [apeChain.id]: http(),
    [tcRipple.id]: http(),
    [tcDoge.id]: http(),
  },
  connectors: [
    // injected(),
    // safe(),
    metaMask(),
  ],
});
