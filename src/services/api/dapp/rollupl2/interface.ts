export interface IRollupL2Info {
  name: string;
  block_number: number;
  block_time: string;
  tps: number;
  mgas: number;
  kbs: number;
  stack: string;
  da: string;
  settlement: string;
  website?: string;
  explorer?: string;
  bitlayer_url?: string;
  provider: string;
  tvl_btc: string;
  index: number;
}

export interface IRollupChart1D {
  timestamp: number;
  fee_usd: string;
  tx_count: number;
  address_actived: number;
}
