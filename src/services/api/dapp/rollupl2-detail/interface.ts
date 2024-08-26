export interface IRollupDetail {
  rollup: IRollupChain;
  balances: ITokenChain[];
}

export interface ITokenChain {
  token_contract_address: string;
  value: string;
  token_name: string;
  token_type: string;
  value_fetched_at: Date;
  block_number: number;
  is_native: boolean;
  chain?: IRollupChain;
}

export interface IRollupChain {
  cached_time: Date;
  id: number;
  name: string;
  block_number: number;
  block_time: Date;
  tps: number;
  mgas: number;
  kbs: number;
  stack: string;
  da: string;
  settlement: string;
  website: string;
  explorer: string;
  provider: string;
  tvl_btc: string;
  bitlayer_url: string;
  verification: string;
  verification_url: string;
  level: string;
  fdv_usd: string;
  icon: string;
  symbol: string;
}

export type RollupTokenRate = {
  [key in string]: string | number;
};

export interface ITransaction {
  cumulative_gas_used: string;
  error: string;
  gas_fee: string;
  gas_price: string;
  gas_used: string;
  hash: string;
  index: number;
  input: string;
  nonce: number;
  r: string;
  s: string;
  status: number;
  v: string;
  value: string;
  inserted_at: string;
  updated_at: string;
  block_hash: string;
  block_number: number;
  from_address: string;
  to_address: string;
  revert_reason: string;
  has_error_in_internal_txs: boolean;
  chain?: IRollupChain;
}

export interface IRollupTransaction {
  rollup: IRollupChain;
  transactions: ITransaction[];
}

export interface ITokenTransfer {
  transaction_hash: string;
  log_index: number;
  from_address: string;
  to_address: string;
  amount: string;
  token_id: number;
  token_contract_address: string;
  inserted_at: Date;
  updated_at: Date;
  block_number: number;
  block_hash: string;
  symbol: string;
  decimals: number;
  chain?: IRollupChain;
}

export interface IRollupTokenTransfer {
  rollup: IRollupChain;
  transfers: ITokenTransfer[];
}

export interface INFT {
  token_contract_address: string;
  value: string;
  token_name: string;
  token_type: string;
  value_fetched_at: Date;
  block_number: number;
  is_native: boolean;
  chain?: IRollupChain;
}

export interface IRollupNFT {
  rollup: IRollupChain;
  balances: INFT[];
}

export interface IRollupNFTDetail {
  token_address: string
  token_id: string
  owner_address: string
  token_uri: string
  token_uri_fetched_at: string
}
