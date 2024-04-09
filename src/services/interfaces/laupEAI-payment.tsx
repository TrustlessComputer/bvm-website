
export const MIN_HARD_CAP_EAI = '4000';

export interface ILeaderBoardPoint {
  need_active?: boolean;
  id?: number;
  network?: string;
  address?: string;
  address_checked?: string;
  avatar?: string;
  twitter_id?: string;
  twitter_username?: string;
  twitter_name?: string;
  twitter_avatar?: string;
  point?: number;
  shard?: number;
  boost?: number;
  num_view?: number;
  num_reply?: number;
  num_retweet?: number;
  num_like?: number;
  num_quote?: number;
  ranking?: number;
  gmx_point?: number;
  refer_point?: number;
  bvm_point?: number;
  content_point?: number;
  trading_point?: number;
  portfolio_point?: number;
  realized_pnl?: string;
  total_ticket?: number;
  won_ticket?: number;
  bought_ticket?: number;
  referral_ticket?: number;
  staking_ticket?: number;
  portfolio_ticket?: number;
  gas_point?: number;
  staking_point?: number;
  brc404_point?: number;
  merlin_point?: number;
  total_point?: number;
  savm_point?: number;
  wining_chance?: number;
  referral_point?: number;
  total_ticket_not_boost?: number;
  claimable?: boolean;
  is_claimed?: boolean;
  follow_point?: number;
  like_point?: number;
  testnet_point?: number;
  src20_point?: number;
  swamps_point?: number;
}

export interface ILeaderBoardEAI extends ILeaderBoardPoint {
  view_boost: string;
  num_post: string;
  celestia_point: string;
  naka_point: string;
  eco_point: string;
  optimism_point: string;
  blast_point: string;
  base_point: string;
  arb_point: string;
  eigenlayer_point: string;
  polygon_point: string;
  game_point: string;
  alpha_point: string;
  manta_amount: string;
  manta_point: string;
  levelRender?: number;
  lastRender?: boolean;
  token_balance: string;
  token_balance_not_boost: string;
  eth_balance: string;
  btc_balance: string;
  usdt_value?: string;
  token_percent?: string;
  coin_balances?: IContributionCoin[];
  deposit_id: string;
  hard_cap: string;
  from_eternal_id: number;
  to_eternal_id: number;
  rank_top_balance: number;
  reach_top_balance: number;
  vesting_token_balance: string;
  over_cap_usdt_value: string;
}

export interface IContributionCoin {
  symbol: string;
  balance: string;
  usdt_value: string;
  network: string;
}

export interface IPublicSaleDailyReward {
  id: number;
  twitter_id: string;
  twitter_username: string;
  twitter_name: string;
  twitter_avatar: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  day6: string;
  day7: string;
  claimed: string;
  total: string;
  pending: string;
}

export interface IPublicSaleLuckyMoney {
  id: number;
  created_at: string;
  bvm_amount: string;
  share_code: string;
  is_claimed?: boolean;
}

export interface IPublicSaleDepositInfo {
  total_user: number;
  total_eth: string;
  total_btc: string;
  total_eth_op: string;
  total_eth_arb: string;
  total_eth_base: string;
  total_tia: string;
  total_op: string;
  total_arb: string;
  total_ordi: string;
  total_sats: string;
  total_token: string;
  total_usdt: string;
  total_usdc: string;
  total_usdt_value: string;
  total_usdt_value_not_boost: string;
  hard_cap: string;
  end_time: string;
  start_time: string;
  vesting_token_balance: string;
  over_cap_usdt_value: string;
}

export const defaultSummary: IPublicSaleDepositInfo = {
  total_user: 0,
  total_eth: '0',
  total_btc: '0',
  total_eth_op: '0',
  total_eth_arb: '0',
  total_eth_base: '0',
  total_tia: '0',
  total_op: '0',
  total_arb: '0',
  total_ordi: '0',
  total_sats: '0',
  total_token: '0',
  total_usdt: '0',
  total_usdc: '0',
  total_usdt_value: '0',
  total_usdt_value_not_boost: '0',
  end_time: '',
  hard_cap: MIN_HARD_CAP_EAI,
  start_time: '',
  vesting_token_balance: '',
  over_cap_usdt_value: '',
};

export interface IResUpdateTwitter {
  secret_code: string;
  link?: string;
}

export interface IBirthEternal {
  address: string;
  count: string;
}
