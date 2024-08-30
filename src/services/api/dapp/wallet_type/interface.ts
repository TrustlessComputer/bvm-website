import { IPosition } from '@/services/api/dapp/staking/interface';

export interface IYoloGameParams extends IPosition{
  settlement_token: string,
  value_per_entry: string,
  round_duration: number,
  maximum_number_of_participants_per_round: number,
  protocol_fee_ratio: string,
}

export interface IYoloGame extends IPosition {
  id: number
  created_at: string
  updated_at: string
  network_id: number
  contract_address: string
  settlement_token: SettlementToken
  name: string
  value_per_entry: string
  round_duration: number
  maximum_number_of_participants_per_round: number
  protocol_fee_ratio: string
}

export interface SettlementToken {
  id: number
  network_id: number
  name: string
  symbol: string
  contract_address: string
  description: string
  image_url: string
  decimals: number
  total_supply: string
  user_created: boolean
  is_native: boolean
}
