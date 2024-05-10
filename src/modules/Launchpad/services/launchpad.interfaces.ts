export interface IPagingParams {
  limit?: number;
  page?: number;
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
  status?: 'prelaunch' | 'ido' | 'ended' | 'upcoming';
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
}

export interface ILaunchpadCreateBody {
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
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
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
  network: string[];
}
