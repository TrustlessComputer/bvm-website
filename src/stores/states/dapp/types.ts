import { OrderItem } from '@/stores/states/l2services/types';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { ISTToken } from '@/services/api/dapp/staking/interface';
import { IAirdrop, IAirdropTask } from '@/services/api/dapp/airdrop/interface';
import { DappModel } from '@/types/customize-model';

export interface DappState {
  chain?: OrderItem | undefined;
  loading?: boolean;
  configs: DappModel[];
  tokens: IToken[];
  stakingPools: ISTToken[];
  airdropTasks: IAirdropTask[];
  airdrops: IAirdrop[];
}
