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
  referrer_code: string
  referral_reward_total: string
  referral_reward_claimed: string
  referral_total: number
  referral_completed: number
}
