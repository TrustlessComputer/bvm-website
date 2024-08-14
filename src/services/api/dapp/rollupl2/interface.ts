export interface IRollupL2Info {
  name: string;
  block_number: number;
  block_time: string;
  tps: number;
  mgas: number;
  kbs: number;
  fdv_usd: string;
  stack: string;
  da: string;
  settlement: string;
  website?: string;
  explorer?: string;
  bitlayer_url?: string;
  provider: string;
  tvl_btc: string;
  index: number;
  verification?: string;
}
