export type BalanceBitcoinType =
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
    type: 'src20',
    title: 'SRC-20',
    color: '#34E178',
  },
  {
    type: 'arc20',
    title: 'ARC-20',
    color: '#F8DB71',
  },
  {
    type: 'ordinals_nft',
    title: 'Ordinals NFT',
    color: '#45C4FF',
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
export interface ISummaryInfo {
  address: string;
  balance: string;
  transaction_count: string;
  first_transaction_time: string;
  last_transaction_time: string;
  summary: string;
}
