export type CoinPrices = {
  [key in Coin]: string
}

export enum Coin {
  BTC = 'BTC',
  TIA = 'TIA',
}

export interface CommonState {
  needReload: number;
  coinPrices: CoinPrices
}
