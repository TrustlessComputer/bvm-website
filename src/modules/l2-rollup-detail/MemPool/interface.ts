export interface FeesMempoolBlocks {
  blockSize: number;
  blockVSize: number;
  nTx: number;
  totalFees: number;
  medianFee: number;
  feeRange: number[];
}

export interface IBlock {
  medianFee: number;
  totalFees: number;
  transactions: number;
  blockSize: number;
  feeRange: number[];
  data: FeesMempoolBlocks | IConfirmedBlock;
  timestamp?: number;
  height?: number;
  id: string;
}

export interface IConfirmedBlock {
  id: string
  height: number
  version: number
  timestamp: number
  bits: number
  nonce: number
  difficulty: number
  merkle_root: string
  tx_count: number
  size: number
  weight: number
  previousblockhash: string
  mediantime: number
  stale: boolean
  extras: Extras
}

export interface Extras {
  reward: number
  coinbaseRaw: string
  orphans: any[]
  medianFee: number
  feeRange: number[]
  totalFees: number
  avgFee: number
  avgFeeRate: number
  utxoSetChange: number
  avgTxSize: number
  totalInputs: number
  totalOutputs: number
  totalOutputAmt: number
  segwitTotalTxs: number
  segwitTotalSize: number
  segwitTotalWeight: number
  feePercentiles: any
  virtualSize: number
  coinbaseAddress: string
  coinbaseAddresses: string[]
  coinbaseSignature: string
  coinbaseSignatureAscii: string
  header: string
  utxoSetSize: any
  totalInputAmt: any
  pool: Pool
  matchRate: number
  expectedFees: number
  expectedWeight: number
  similarity: number
}

export interface Pool {
  id: number
  name: string
  slug: string
}
