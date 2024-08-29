import { WalletType } from '@/stores/states/dapp/types';

export interface IReqDapp {
  orderID: string
}

export interface IDappConfigs {
  network_id?: string;
  user_domain?: string;
  bvm_domain?: string;
  bvm_app_store_domain?: string;
  owner_twitter_id?: string;
  app_env?: string;
  cdn_url?: string;
  favicon_url?: string;
  app_name?: string;
  banner_url?: string;
  rpc_url?: string;
  explorer_url?: string;
  gas_price?: string;
  apps?: string;
  twitter_client_id?: string;
  twitter_redirect_uri?: string;
  web3_auth_client_id?: string;
  template: ITemplate;
  wallet_type?: WalletType;
};

export enum TemplateType {
  TEMPLATE_1 = "template_1",
}

export interface ITemplate {
  templateType: TemplateType;
  backgroundImage: string;
  logo?: string;
  backupLogo?: string;
  appName: string;
  template_1?: ITemplate1;
}

export interface IContentTextTemplate1 {
  first: string;
  last: string;
  headings?: string[];
  headingsStyles?: string[];
  headingsColors: string[];
  desc: string;
}

export interface ITemplate1 {
  contentText: IContentTextTemplate1;
}

export interface IAppInfo {
  code: string
  name: string
  description: string
  icon_url: string
  image_url: string
}

export type AppCode = 'create_token' | 'staking' | 'account_abstraction' | 'btc_bridge' | 'eth_bridge' | 'airdrop' | 'yologame' | 'orderbook';
