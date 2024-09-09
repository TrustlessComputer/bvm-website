import { IPosition } from '@/services/api/dapp/staking/interface';

export interface IGenerationTokenParams extends IPosition {
  data_hex: string;
  type: string;
  network_id: number;
}

export interface IToken extends IPosition {
  id?: number;
  network_id?: number;
  name?: string;
  symbol?: string;
  contract_address?: string;
  description?: string;
  image_url?: string;
  decimals?: number;
  total_supply?: string;
  user_created?: boolean;
  is_native?: boolean;
  vestings?: ITokenVesting[];
}

export interface ITokenVesting {
  id?: number;
  network_id?: number;
  token_id?: number;
  token?: null;
  contract_address?: string;
  beneficiary_id?: number;
  beneficiary_name?: string;
  beneficiary?: string;
  start?: number;
  duration?: number;
  duration_units?: number;
  amount_total?: string;
  unvest_amount?: string;
  cliff?: number;
  cliff_units?: number;
}
