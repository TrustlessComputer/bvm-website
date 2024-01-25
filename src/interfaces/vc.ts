export interface VCWalletInfo {
  btc_address: string,
  btc_balance: string,
  eth_address: string,
  eth_balance: string,
  vc_type: string,
  wallet_id: string,
}

export interface VCInfo {
  description: string;
  name: string;
  title: string;
  type: string;
  available_tokens: string;
  fdv: string;
  fundraising_goal: string;
  min_personal_cap: string;
  token_price: string;
  total_tokens: string;
}

export interface PublicSaleWalletInfo {
  btc_address: string,
  btc_balance: string,
  eth_address: string,
  eth_balance: string,
}

export interface IPublicSaleDepositInfo {
  total_btc: string;
  total_bvm: string;
  total_eth: string;
  total_user: number;
}
