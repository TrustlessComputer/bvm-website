export interface ILeaderBoardPoint {
  need_active: boolean;
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
  total_point_inday?: number;
  point_spread_inday?: number;
  point_swap_inday?: number;
  point_future_inday?: number;
  point_portfolio_inday?: number;
}
