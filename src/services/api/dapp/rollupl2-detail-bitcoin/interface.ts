export type BalanceBitcoinType =
  | 'fractal'
  | 'runes'
  | 'brc20'
  | 'src20'
  | 'arc20'
  | 'ordinals_nft';

export const BalanceTypes: {
  type: BalanceBitcoinType;
  title: string;
  color: string;
}[] = [
  {
    type: 'runes',
    title: 'Runes',
    color: '#D44DFA',
  },
  {
    type: 'brc20',
    title: 'BRC-20',
    color: '#7660F5',
  },
  {
    type: 'ordinals_nft',
    title: 'Ordinals',
    color: '#45C4FF',
  },
  {
    type: 'src20',
    title: 'SRC-20',
    color: '#34E178',
  },
  {
    type: 'arc20',
    title: 'ARC-20',
    color: '#F8DB71',
  },
];

export interface IBalanceBitcoin {
  symbol: string;
  inscription_id: string;
  holding_amount: string;
  inscription_amount: string;
  available_amount: string;
  transferable_amount: string;
  inscription_number: string;
  token_price: number;
  image_url?: string;
  content_type?: string;
}

export interface IBalanceBitcoinInfo {
  address: string;
  balance: string;
  transaction_count: string;
  first_transaction_time: string;
  last_transaction_time: string;
  fractal?: {
    funded_txo_sum: number;
    funded_txo_count: number;
    spent_txo_count: number;
    tx_count: number;
  };
}

export interface IBitcoinTokenTransaction {
  tx_id: string;
  transaction_time: string;
  from: string;
  to: string;
  amount: string;
  transaction_symbol: string;
  tx_fee: string;
  state: string;
  block_hash: string;
  symbol: string;
  action: string;
  token_inscription_id: string;
  protocol_type: string;
  inscription_id: string;
  inscription_number: string;
  output_index: string;
}

export interface ISummaryInfo {
  address: string;
  balance: string;
  transaction_count: string;
  first_transaction_time: string;
  last_transaction_time: string;
  summary: string;
}

export interface ITxBTC {
  tx_id: string;
  height: string;
  transaction_time: number;
  amount: string;
  transaction_symbol: string;
  txfee: string;
  index: string;
  confirm: string;
  input_details: ITxBTCPutDetail[];
  output_details: ITxBTCPutDetail[];
  state: string;
  total_transaction_size: string;
  virtual_size: string;
  weight: string;
  token_transfer: ITxBTCTokenTransfer[];
  chain?: string;
}

export interface ITxBTCPutDetail {
  output_hash: string;
  input_hash: string;
  is_contract: boolean;
  amount: string;
}

export interface ITxBTCTokenTransfer {
  btc_transaction_id: number;
  tx_id: string;
  block_hash: string;
  height: string;
  transaction_time: number;
  from: string;
  to: string;
  amount: string;
  action: string;
  token_inscription_id: string;
  protocol_type: string;
  state: string;
  inscription_id: string;
  inscription_number: string;
  symbol: string;
  output_index: string;
}

export interface IFBitcoinTransaction {
  txid: string;
  size: number;
  weight: number;
  fee: number;
  vin: IFBTxVin[];
  vout: IFBTxVout[];
  status: IFBTxStatus;
  order: number;
  vsize: number;
  adjustedVsize: number;
  sigops: number;
  feePerVsize: number;
  adjustedFeePerVsize: number;
  effectiveFeePerVsize: number;
}

export interface IFBTxStatus {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface IFBTxVin {
  is_coinbase: boolean;
  prevout: IFBTxVout;
  scriptsig: string;
  scriptsig_asm: string;
  sequence: number;
  vout: number;
  txid: string;
}

export interface IFBTxVout {
  value: number;
  scriptpubkey: string;
  scriptpubkey_address: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
}
