export type BalanceBitcoinType =
  | 'runes'
  | 'brc20'
  | 'src20'
  | 'arc20'
  | 'ordinals_nft';

export const BalanceTypes: { type: BalanceBitcoinType; title: string }[] = [
  {
    type: 'runes',
    title: 'Runes',
  },
  {
    type: 'brc20',
    title: 'BRC-20',
  },
  {
    type: 'src20',
    title: 'SRC-20',
  },
  {
    type: 'arc20',
    title: 'ARC-20',
  },
  {
    type: 'ordinals_nft',
    title: 'Ordinals NFT',
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
