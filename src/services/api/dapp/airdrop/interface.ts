import { IToken } from '../token_generation/interface';
import { IPosition } from '@/services/api/dapp/staking/interface';

export interface IAirdropTask {
  id: number;
  title: string;
  description: string;
  type: string;
  follow_twitter: string;
  share_post_link: string;
  amount: string;
}

export interface ITaskReceiver {
  address: string;
  amount: string;
}

export interface ITask {
  id: number;
  amount: string;
  content: string;
}

export interface IBodySetupTask extends IPosition {
  title: string;
  description?: string;
  start_time: number;
  end_time: number;
  token_address: string;
  amount: string;
  tasks?: ITask[];
  receivers?: ITaskReceiver[];
  is_bvm_shard: boolean;
}

export interface IAirdrop {
  id: number;
  network_id: number;
  owner_address: string;
  admin_address: string;
  contract_address: string;
  title: string;
  description: string;
  status: EAirdropStatus;
  token_address: string;
  amount: string;
  start_time: string;
  end_time: string;
  expired_time: string;
  tasks: IAirdropTask[];
  is_bvm_shard: boolean;
  token: IToken;
}

export enum EAirdropStatus {
  new = 'new',
  deposited = 'deposited',
  processing = 'processing',
  ended = 'ended',
  expired = 'expired',
}
