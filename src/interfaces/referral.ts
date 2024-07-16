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
  referral_claimed?: number;
  referral_total?: number;
  referrer_code?: string;
}
