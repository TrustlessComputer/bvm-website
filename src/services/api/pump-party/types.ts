export interface IPumpPartyOwner {
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
  trading_volume: string;
  rewards: any[];
  refer_status: string;
  user_name: string;
  description: string;
  image_url: string;
  followers: number;
  following: number;
  likes: number;
  mentions: number;
}

export enum EPumpPartyStatus {
  new = 'new',
  created = 'created',
  progress = 'progress',
}

export interface IPumpParty {
  id: number;
  created_at: Date;
  updated_at: Date;
  owner_address: string;
  owner: IPumpPartyOwner;
  token_address: string;
  name: string;
  description: string;
  ticker: string;
  image: string;
  twitter: string;
  telegram: string;
  website: string;
  tx_hash: string;
  status: EPumpPartyStatus;
  pool: string;
  naka_pool: string;
  naka_token_address: string;
  supply: string;
  price: string;
  price_usd: string;
  price_last24h: string;
  volume_last24h: string;
  total_volume: string;
  base_token_symbol: string;
  cap: string;
  percent: string;
  rune_number?: string;
  reply_count?: string;
  btc_tx_commit?: string;
  btc_tx_reveal?: string;
}

export interface IRequestPumpPartyParams {
  page: number;
  limit: number;
  search?: string;
}
