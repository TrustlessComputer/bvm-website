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
}

export const defaultSummary: IPublicSaleDepositInfo = {
  total_user: 0,
  total_eth: '0',
  total_btc: '0',
  total_eth_op: '0',
  total_eth_arb: '0',
  total_eth_base: '0',
  total_tia: '0',
  total_op: '0',
  total_arb: '0',
  total_ordi: '0',
  total_sats: '0',
  total_bvm: '0',
  total_usdt: '0',
  total_usdc: '0',
  total_usdt_value: '0',
};

export interface IGenerateTOkenWithSecretCode {
  expired_at: string;
  token: string;
}

export interface PublicSaleWalletTokenDeposit {
  address: string;
  coin: string;
  network: string[];
}
