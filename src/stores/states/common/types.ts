import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { IPublicSaleDailyReward } from '@/services/public-sale';

export type CoinPrices = {
  [key in Coin]: string
}

export enum Coin {
  BTC = 'BTC',
  ETH = 'ETH',
  TIA = 'TIA',
}

export interface CommonState {
  needReload: number;
  coinPrices: CoinPrices,
  configs: any,
  leaderBoardMode: 0 | 1;
  needCheckDeposit: boolean;
  animatedLatestContributors: ILeaderBoardPoint[];
  publicSaleDailyReward?: IPublicSaleDailyReward;
}
