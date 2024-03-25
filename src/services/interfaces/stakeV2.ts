export interface StakeMember {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  user: User;
  team_code: string;
  team_role: string;
  principle_balance: string;
  team_principle_balance: string;
}

export interface User {
  id: number;
  network: string;
  address: string;
  address_checked: string;
  referral_code: string;
  referrer_address: string;
  referrer_code: string;
  referrer_twitter_id: string;
  referral_at: null;
  twitter_id: string;
  twitter_username: string;
  twitter_name: string;
  twitter_avatar: string;
  ranking: number;
  need_active: boolean;
  point: number;
  total_point_inday: number;
  point_spread_inday: number;
  point_swap_inday: number;
  point_future_inday: number;
  point_portfolio_inday: number;
  gmx_point: number;
  alpha_point: number;
  refer_point: number;
  content_point: number;
  bvm_point: number;
  shard: number;
  num_view: number;
  num_reply: number;
  num_retweet: number;
  num_like: number;
  num_quote: number;
  boost: string;
  future_total_volume: string;
  referral_rewarded: string;
  referral_claimed: string;
  realized_pnl: string;
  total_ticket: number;
  referral_ticket: number;
  staking_ticket: number;
  portfolio_ticket: number;
  won_ticket: number;
  bought_ticket: number;
  total_point: number;
  portfolio_point: number;
  trading_point: number;
  referral_point: number;
  staking_point: number;
}

export enum HistoryType {
  stake = 'stake',
  unStake = 'unstake',
  restake = 'restake',
}

export interface StakeHistory {
  id: number;
  created_at: string;
  updated_at: string;
  contract_address: string;
  transaction_at: string;
  tx_hash: string;
  type: HistoryType;
  user_id: number;
  user_address: string;
  unstake_id: number;
  principle_amount: string;
  principle_balance: string;
  valid_at: string;
  is_claimed: boolean;
  restake_at?: string;
}

export interface StakeLeaderBoard {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  team_code: string;
  team_role: string;
  principle_balance: string;
  team_principle_balance: string;
  total_members: string;
  need_active?: boolean;
  address: string;
  twitter_id: string;
  twitter_name: string;
  twitter_username: string;
  twitter_avatar: string;
  rewarded: string;
}
