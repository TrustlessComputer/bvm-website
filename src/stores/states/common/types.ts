export interface CoinPrices {
  [Coin.BTC]: string,
}

export enum Coin {
  BTC = 'BTC',
}

export interface CommonState {
  needReload: number;
  coinPrices: CoinPrices
}
