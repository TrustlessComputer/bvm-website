import { ILaunchpadBodyTask } from './lauchpad.create.interface';

export interface IPagingParams {
  limit?: number;
  page?: number;
}

export enum ELaunchpadStatus {
  new = 'new',
  voting = 'voting',
  prelaunch = 'prelaunch',
  ido = 'ido',
  ended = 'ended',
  tge = 'tge',
  listing = 'listing',
}

export interface ILaunchpad {
  id: number;
  name?: string;
  description?: string;
  short_description?: string;
  teaser_description?: string;
  link?: string;
  image?: string;
  faq?: string;
  token_address?: string;
  block_chain?: string;
  launchpad_price?: string;
  launchpad_allocation?: string;
  launchpad_valuation?: string;
  launching_valuation?: string;
  total_supply?: string;
  start_date?: string;
  end_ido_date?: string;
  end_date?: string;
  launchpad_fee_option_id?: number;
  allocation_ticket?: number;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  token_name?: string;
  blockchain?: string;
  status?: ELaunchpadStatus;
  admin_address?: string;
  pre_launch_start_date?: string;
  pre_launch_end_date?: string;
  project_valuation?: string;
  token_per_ticket?: string;
  bvm_win_per_ticket?: string;
  categories?: string;
  logo?: string;
  token_offered?: string;
  participants?: string;
  price?: string;
  total_committed?: string;
  hard_cap?: string;
  pre_sale?: boolean;
  tasks?: ILaunchpadBodyTask[];
  pre_sale_duration?: number;
  public_sale_duration?: number;
  payment_tokens?: WalletTokenDeposit[];
  pool_address?: string;
}

export interface ILaunchpadCreateBody {
  name?: string;
  token_name?: string;
  token_symbol?: string;
  token_decimals?: string;
  description?: string;
  short_description?: string;
  link?: string;
  image?: string;
  faq?: string;
  token_address?: string;
  block_chain?: string;
  launchpad_price?: string;
  launchpad_allocation?: string;
  launchpad_valuation?: string;
  price_allocation_ticket?: string;
  total_launchpad_valuation?: string;
  total_supply?: string;
  start_date?: string;
  end_ido_date?: string;
  end_date?: string;
  launchpad_fee_option_id?: number;
  allocation_ticket?: number;
  web?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  hard_cap?: string;
  liquidity?: string;
  vesting?: string;
  pre_sale?: boolean;
  pre_launch_start_date?: boolean;
  pre_launch_end_date?: boolean;
  tasks?: ILaunchpadBodyTask[];
  pre_sale_duration?: number;
  public_sale_duration?: number;
  public_sale_allocation?: number;
  liquidity_fund_ratio?: number;
  airdrop_ratio?: number;
}

export interface ILaunchpadTicket {
  id: number;
  code: string;
  status: string;
}

export interface ILaunchpadFeeOption {
  id?: number;
  name?: string;
  description?: string;
  bvm_amount?: string;
  lp_sold_percent?: number;
  funded_percent?: number;
}

export interface IBlockScout {
  address: number;
  total_blocks: number;
  total_transactions: number;
  tvl: string;
  circulating_supply?: number;
}

export interface ILaunchpadClaimParams {
  address: string;
  message: string;
  signature: string;
  is_stake?: boolean;
}

export interface WalletTokenDeposit {
  address: string;
  coin: string;
  symbol: string;
  network: string[];
  decimals: number;
}

export interface IPreLaunchpadTask {
  launchpad_project_id?: number;
  launchpad_task_id?: number;
  launchpad_task?: IPreLaunchpadItemTask;
  point_type?: string;
  input_values?: IPreLaunchpadTaskInput[];
}

export interface IPreLaunchpadTaskInput {
  key?: IPreLaunchpadTaskKey;
  value?: string;
  name?: IPreLaunchpadTaskDescription;
  description?: IPreLaunchpadTaskDescription;
}

export enum IPreLaunchpadTaskDescription {
  Empty = '',
  Point = 'Point',
  PointPer000025BTC = 'Point per 0.00025 BTC',
  TwitterUsername = 'Twitter Username',
}

export enum IPreLaunchpadTaskKey {
  Point = 'point',
  PointPerAmount = 'point_per_amount',
  Text = 'text',
}

export interface IPreLaunchpadItemTask {
  id?: number;
  name?: string;
  description?: string;
  link?: string;
  image?: string;
  point_type?: string;
  input_fileds?: IPreLaunchpadTaskInput[];
}

export enum IPreLaunchpadPointType {
  Staking = 'staking',
  Refer = 'refer',
  FollowOnX = 'follow_on_x',
  SpreadOnX = 'spread_on_x',
  LikeOnX = 'like_on_x',
  Portfolio = 'portfolio',
}
