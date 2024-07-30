import TOKEN_ADDRESS from '@/constants/token';
import BVM_ADDRESS from '@/contract/stakeV2/configs';
import { getUrlToSwap } from '@/utils/helpers';

export interface IExchange {
  name: string;
  url: string;
  image?: string;
}

export const EXCHANGES: IExchange[] = [
  {
    name: 'Buy on Naka',
    url: getUrlToSwap({
      from_token: TOKEN_ADDRESS.BTC_ADDRESS_L2,
      to_token: BVM_ADDRESS.BVM.bvm,
    }),
    image: undefined,
  },
  {
    name: 'Uniswap',
    url: 'https://app.uniswap.org/swap?outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d',
    image: '/images/launchpad/bvmHolder/uniswap_logo.svg',
  },
  {
    name: 'Gate.io',
    url: 'https://www.gate.io/trade/BVM_USDT',
    image: '/images/launchpad/bvmHolder/gate.io_logo.svg',
  },
  // {
  //   name: 'Bitmart',
  //   url: 'https://www.bitmart.com/trade/en-US?symbol=BVM_USDT',
  //   image: '/images/launchpad/bvmHolder/bitmart_logo.svg'
  // },
  {
    name: 'Unisat',
    url: 'https://unisat.io/market/brc20?tick=BVMN',
    image: '/images/launchpad/bvmHolder/unisat_logo.svg',
  },
  {
    name: 'OKX Web3',
    url: 'https://www.okx.com/web3/dex-swap#inputChain=1&inputCurrency=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outputChain=1&outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d',
    image: '/images/launchpad/bvmHolder/okx_logo.svg',
  },
  {
    name: 'MEXC',
    url: 'https://www.mexc.com/exchange/BVM_USDT',
    image: '/images/launchpad/bvmHolder/mexc_logo.svg',
  },

  // {
  //   name: 'Poloniex',
  //   url: getUrlToSwap({
  //     from_token: TOKEN_ADDRESS.BTC_ADDRESS_L2,
  //     to_token: BVM_ADDRESS.bvm,
  //   }),
  //   image: '/images/launchpad/bvmHolder/poloniex_logo.svg'
  // },
];
