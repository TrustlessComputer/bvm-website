import { IPosition } from '@/services/api/dapp/staking/interface';
import { IToken } from '@/services/api/dapp/token_generation/interface';

export interface IWhitePaper extends IPosition {
  id: number
  network_id: number
  contract_address: string
  token_id: number
  white_paper: string
  token: IToken
  status: string;
}
