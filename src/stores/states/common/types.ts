export interface CommonState {
  needReload: number;
  coinPrices: {
    [x: string]: string;
  };
}
