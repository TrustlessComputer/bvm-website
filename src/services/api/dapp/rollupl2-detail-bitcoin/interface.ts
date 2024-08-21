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
}
