import React from 'react';

export interface ILeaderBoardPoint {
  id: number;
  network: string;
  twitter_id: string;
  twitter_username: string;
  twitter_name: string;
  twitter_avatar: string;
  ranking: number;
  need_active: boolean;
  point: number;
  bvm_point: number;
  gas_point: number;
  content_point: number;
  boost: string;
  num_view: string;
  num_retweet: string;
  num_like: string;
  num_quote: string;
  num_post: string;
  refer_point: string;
  celestia_point: string;
  naka_point: string;
  eco_point: string;
  optimism_point: string;
}
