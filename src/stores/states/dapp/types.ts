import { OrderItem } from '@/stores/states/l2services/types';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { ISTToken } from '@/services/api/dapp/staking/interface';
import { IAirdropTask } from '@/services/api/dapp/airdrop/interface';

export interface DappState {
  chain?: OrderItem | undefined;
  loading?: boolean;
  configs: DappModel[];
  tokens: IToken[];
  stakingPools: ISTToken[];
  airdropTasks: IAirdropTask[];
}
