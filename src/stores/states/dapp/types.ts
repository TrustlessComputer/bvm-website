import { OrderItem } from '@/stores/states/l2services/types';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { ISTToken } from '@/services/api/dapp/staking/interface';
import { IAirdrop, IAirdropTask } from '@/services/api/dapp/airdrop/interface';
import { DappModel } from '@/types/customize-model';
import { IAppInfo, IDappConfigs } from '@/services/api/dapp/types';
import { IYoloGame } from '@/services/api/dapp/yolo/interface';
import { IWhitePaper } from '@/services/api/dapp/whitePapers/interface';

export enum WalletType {
  naka = "naka",
  inGame = "inGame",
  thirdWeb = "thirdWeb",
}

export interface DappState {
  chain?: OrderItem | undefined;
  loading?: boolean;
  configs: DappModel[];
  tokens: IToken[];
  stakingPools: ISTToken[];
  airdropTasks: IAirdropTask[];
  airdrops: IAirdrop[];
  dappConfigs: IDappConfigs | undefined;
  appInfos: IAppInfo[];
  yoloGames: IYoloGame[];
  tokensAll: IToken[];
  walletType?: WalletType;
  whitePapers: IWhitePaper[];
}
