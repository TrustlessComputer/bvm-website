export interface IRollupL2Info {
  id: number;
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
  verification_url?: string;
  level?: string;
  fee_btc?: string;
  chain_id: number;
  fee_chart_supported: boolean;
}

export interface IRollupChart1D {
  timestamp: number;
  fee_usd: string;
  tx_count: number;
  address_actived: number;
  notes: string;
}

export interface IRollupActiveAddressChart1D {
  rollup_datas: IRollupL2Info[];
  charts: IActiveAddressChart[];
}

export interface IActiveAddressChart {
  timestamp: number;
  address_actived_day: number;
  chain_charts: IChainChart[];
}

export interface IChainChart {
  rollup_data_id: number;
  timestamp: number;
  address_actived_day: number;
}
