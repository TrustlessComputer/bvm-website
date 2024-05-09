/* eslint-disable @typescript-eslint/no-explicit-any */
export const tokenIcons: any = {
  weth: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  eth: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  wbtc: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1.png',
  btc: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1.png',
  gm: 'https://i.ibb.co/GCCRx0C/GM.png',
  'wrapped gm': 'https://i.ibb.co/GCCRx0C/GM.png',
  tc: 'https://cdn.trustless.domains/icons/tc_ic.svg',
  usdt: 'https://s2.coinmarketcap.com/static/img/coins/128x128/21763.png',
  usdc: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
  pepe: 'https://s2.coinmarketcap.com/static/img/coins/128x128/24478.png',
  sol: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
  matic: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
  '1000sats': 'https://s2.coinmarketcap.com/static/img/coins/64x64/28683.png',
  ordi: 'https://s2.coinmarketcap.com/static/img/coins/64x64/25028.png',
  naka: 'https://cdn.bvm.network/internal/4934ca81-cdfd-423a-968e-7d1f3af31406.png',
  tia: 'https://s2.coinmarketcap.com/static/img/coins/64x64/22861.png',
  op: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png',
  arb: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png',
  bvm: 'https://s2.coinmarketcap.com/static/img/coins/64x64/29767.png',
};

export const INFO_TOKENS = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: tokenIcons['btc'],
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: tokenIcons['eth'],
  },
  USDT: {
    name: 'Tether USDt',
    symbol: 'USDT',
    icon: tokenIcons['usdt'],
  },
  USDC: {
    name: 'USDC',
    symbol: 'USDC',
    icon: tokenIcons['usdc'],
  },
  TIA: {
    name: 'Celestia',
    symbol: 'TIA',
    icon: tokenIcons['tia'],
  },
  OP: {
    name: 'Optimism',
    symbol: 'OP',
    icon: tokenIcons['op'],
  },
  ARB: {
    name: 'Arbitrum',
    symbol: 'ARB',
    icon: tokenIcons['arb'],
  },
  ORDI: {
    name: 'ORDI',
    symbol: 'ORDI',
    icon: tokenIcons['ordi'],
  },
  SATS: {
    name: 'SATS',
    symbol: 'SATS',
    icon: tokenIcons['1000sats'],
  },
};
