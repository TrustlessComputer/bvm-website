export interface CoinPrices {
  [Coin.BTC]: string,
  [Coin.ETH]: string,
}

export enum Coin {
  BTC = 'BTC',
  ETH = 'ETH',
}

export interface CommonState {
  needReload: number;
  coinPrices: CoinPrices
}
