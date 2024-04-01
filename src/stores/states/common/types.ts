import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { IPublicSaleDailyReward, IPublicSaleLuckyMoney } from '@/services/public-sale';
import { IPublicSaleDepositInfo } from '@/interfaces/vc';

export type CoinPrices = {
  [key in Coin]: string
}

export enum Coin {
  BTC = 'BTC',
  ETH = 'ETH',
  TIA = 'TIA',
  BVM = 'BVM',
}

export interface CommonState {
  needReload: number;
  coinPrices: CoinPrices,
  configs: any,
  leaderBoardMode: 0 | 1;
  needCheckDeposit: boolean;
  animatedLatestContributors: ILeaderBoardPoint[];
  publicSaleDailyReward?: IPublicSaleDailyReward;
  luckyMoneyList: IPublicSaleLuckyMoney[];
  currentLuckyMoney: IPublicSaleLuckyMoney | undefined;
  publicSaleSummary: IPublicSaleDepositInfo | undefined;
  userContributeInfo: ILeaderBoardPoint | undefined;
}
