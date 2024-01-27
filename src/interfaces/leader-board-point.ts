import { IContributionCoin } from '@/modules/PublicSale/components/contributorDetailInfo';

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
  blast_point: string;
  base_point: string;
  arb_point: string;
  eigenlayer_point: string;
  polygon_point: string;
  game_point: string;
  alpha_point: string
  manta_amount: string;
  manta_point: string;
  levelRender?:number
  lastRender?:boolean
  bvm_balance: string;
  eth_balance: string;
  btc_balance: string;
  usdt_value?:string;
  bvm_percent?:string;
  coin_balances?:IContributionCoin[];
}
