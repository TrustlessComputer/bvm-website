import { FeesMempoolBlocks } from '@mempool/mempool.js/lib/interfaces/bitcoin/fees';

export interface IBlock {
  feeSpan: number;
  medianFee: number;
  totalFees: number;
  transactions: number;
  blockSize: number;
  feeRange: number[];
  data: FeesMempoolBlocks;
  txHash?: string;
}
