export interface IReferralRewardInfo {
  claimed: string;
  claimed_usd: string;
  symbol: string;
  total: string;
  total_usd: string;
}

export interface IUserReferralInfo {
  id: number
  network_id: number
  address: string
  twitter_id: string
  twitter_avatar: string
  twitter_username: string
  twitter_name: string
  is_owner: boolean
  referral_code: string
  referrer_address: string

  referrer_code?: string;
  trading_volume?: string;
  referral_rewarded?: number;
  referral_claimed?: number;
  rewards: IReferralRewardInfo[];
}
