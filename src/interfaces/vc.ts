export interface VCWalletInfo {
  btc_address: string;
  btc_balance: string;
  eth_address: string;
  eth_balance: string;
  vc_type: string;
  wallet_id: string;
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
  btc_address: string;
  btc_balance: string;
  eth_address: string;
  eth_balance: string;
}

export interface IPublicSaleDepositInfo {
  total_user: number;
  total_eth: string;
  total_btc: string;
  total_eth_op: string;
  total_eth_arb: string;
  total_eth_base: string;
  total_tia: string;
  total_op: string;
  total_arb: string;
  total_ordi: string;
  total_sats: string;
  total_bvm: string;
  total_usdt: string;
  total_usdc: string;
  total_usdt_value: string;
  total_usdt_value_not_boost: string;
}

export interface IGenerateTOkenWithSecretCode {
  expired_at: string;
  token: string;
}

export interface PublicSaleWalletTokenDeposit {
  address: string;
  coin: string;
  network: string[];
}
