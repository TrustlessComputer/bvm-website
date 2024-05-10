/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IToken {
  id?: number;
  address: string;
  address_check?: string;
  total_supply?: string;
  owner?: string;
  decimal?: number;
  symbol?: string;
  status?: string;
  name?: string;
  thumbnail?: string;
  description?: string;
  social?: ISocial;
  index?: number;
  network?: string;
  priority?: number;
  verify_code?: string;
  is_verified_twitter?: boolean;
  base_token_symbol?: string;
  chain?: string;

  contract_address?: string;
  total_volume?: string;
  price?: string;
  usd_price?: string;
  twitter_id?: string;
  twitter_name?: string;
  twitter_username?: string;
  twitter_avatar?: string;
  is_pre_sale?: boolean;

  is_token?: boolean;
  is_pass?: boolean;
  pair_created_at?: string;
  apr?: string;
}

export interface ISocial {
  website?: string;
  discord?: string;
  twitter?: string;
  telegram?: string;
  medium?: string;
  instagram?: string;
}
