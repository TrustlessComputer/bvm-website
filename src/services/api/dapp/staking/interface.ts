export interface ICoordinates {
  x: number | string;
  y: number | string;
}

export interface IPosition {
  positionID: number | string;
  position: ICoordinates;
}

export interface ISTToken extends IPosition {
  id: number;
  network_id: number;
  contract_address: string;
  reward_pool_address: string;
  principle_token_address: string;
  principle_token: IStakeToken;
  reward_token_address: string;
  reward_token: IStakeToken;
  interest_rate: string;
  token_rate: string;
  balance: string;
  status: string;
}

export interface IStakeToken {
  id: number;
  network_id: number;
  name: string;
  symbol: string;
  contract_address: string;
  description: string;
  image_url?: string;
  decimals: number;
  total_supply: string;
  user_created: boolean;
}
