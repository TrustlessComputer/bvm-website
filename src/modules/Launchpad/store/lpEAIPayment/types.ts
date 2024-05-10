import { WalletTokenDeposit } from '../../services/launchpad.interfaces';
import {
  IBirthEternal,
  ILeaderBoardEAI,
  IPublicSaleDailyReward,
  IPublicSaleDepositInfo,
  IPublicSaleLuckyMoney,
} from '../../services/laupEAI-payment.interfaces';

export interface LaupEAIState {
  depositExternal?: {
    [key: string]: WalletTokenDeposit[];
  };
  depositNaka?: {
    [key: string]: WalletTokenDeposit[];
  };
  birthEternal?: {
    [key: string]: IBirthEternal;
  };
  birthEternalAddress: string[];
  needCheckDeposit: boolean;
  animatedLatestContributors: ILeaderBoardEAI[];
  publicSaleDailyReward?: IPublicSaleDailyReward;
  luckyMoneyList: IPublicSaleLuckyMoney[];
  currentLuckyMoney: IPublicSaleLuckyMoney | undefined;
  publicSaleSummary: IPublicSaleDepositInfo | undefined;
  oldPublicSaleSummary: IPublicSaleDepositInfo | undefined;
  userContributeInfo: ILeaderBoardEAI | undefined;
  publicSaleLeaderBoardVisual: ILeaderBoardEAI[];
  publicSaleLeaderBoard: ILeaderBoardEAI[];
  hasSpreadTheLove: boolean;
}

export const MIN_HARD_CAP_EAI = '4000';
