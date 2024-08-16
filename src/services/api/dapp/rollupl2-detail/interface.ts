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
}

export type RollupTokenRate = {
  [key in string]: string | number;
};
