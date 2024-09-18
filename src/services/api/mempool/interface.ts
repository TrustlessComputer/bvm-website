export interface IMempoolBlock {
  blockSize: number;
  blockVSize: number;
  nTx: number;
  totalFees: number;
  medianFee: number;
  feeRange: number[];
}

export interface IMempoolTransactionStatus {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface IMempoolMining {
  blockCount: number;
  lastEstimatedHashrate: number;
}
