export type CoinPrices = {
  [key in Coin]: string
}

export enum Coin {
  BTC = 'BTC',
  TIA = 'TIA',
  ETH = 'ETH',
}

export interface CommonState {
  needReload: number;
  coinPrices: CoinPrices,
  leaderBoardMode: 0 | 1;
}
