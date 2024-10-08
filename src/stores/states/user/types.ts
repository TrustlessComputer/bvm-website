import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { SignatureStatus } from '@/interfaces/whitelist';

export interface User {
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

export type EVMFieldType = 'allowOptimism';

export interface IAuthSetting {
  naka_fee_enabled: boolean;
}

export interface UserState {
  user?: User | undefined;
  leaderBoard: ILeaderBoardPoint[];
  leaderBoardCount: string;
  allowBTC: {
    status: SignatureStatus[];
    loaded: boolean;
  };
  allowCelestia: {
    status: SignatureStatus[];
    loaded: boolean;
  };
  airdropAlphaUsers: any;
  airdropGMHolders: any;
  airdropGenerativeUsers: any;
  airdropPerceptronsHolders: any;
  publicSaleLeaderBoard: ILeaderBoardPoint[];
  publicSaleLeaderBoardVisual: ILeaderBoardPoint[];
  userToken: string;
  depositAddress: any;
  nakaUser?: {
    address: string;
    token: string;
  };

  allow404: {
    status: SignatureStatus[];
    loaded: boolean;
  };
  stakingBVM: {
    status: SignatureStatus[];
    loaded: boolean;
  };
  holdingBTC: {
    status: SignatureStatus[];
    loaded: boolean;
  };
  allowSAVM: {
    status: SignatureStatus[];
    loaded: boolean;
  };
  holdingEAI: {
    status: SignatureStatus[];
    loaded: boolean;
  };
  holdingRDNR: {
    status: SignatureStatus[];
    loaded: boolean;
  };
  holdingSWPL2: {
    status: SignatureStatus[];
    loaded: boolean;
  };
  holdingSWPSRC20: {
    status: SignatureStatus[];
    loaded: boolean;
  };

  x_token?: string;
  authSetting: IAuthSetting;
}
