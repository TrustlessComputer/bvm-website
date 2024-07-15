export interface UserReferral {
  id: string;
  network: string;
  twitter_id: string;
  twitter_username: string;
  twitter_name: string;
  twitter_avatar: string;
  ranking: string;
  need_active: boolean;
  point: string;
  bvm_point: string;
  gas_point: string;
  content_point: string;
  referral_code: string;
  referrer_twitter_id: string;
  num_view: string;
  num_retweet: string;
  num_like: string;
  num_quote: string;
  num_post: string;
  boost: string;
  guest_code: string;
  view_boost: string;
}

export interface UserState {
  userReferral?: UserReferral | undefined;
}
