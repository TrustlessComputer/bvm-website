import { FeesMempoolBlocks, IBlock, IConfirmedBlock } from '@/modules/l2-rollup-detail/MemPool/interface';

export const mapPendingBlockToBlock = (block: FeesMempoolBlocks, id: string, timestamp: number) => {
  return {
    id: id,
    medianFee: block.medianFee,
    totalFees: block.totalFees,
    transactions: block.nTx,
    blockSize: block.blockSize,
    feeRange: block.feeRange,
    timestamp: timestamp,
    data: block,
  } as IBlock;
};

export const mapConfirmedBlockToBlock = (block: IConfirmedBlock) => {
  return {
    id: block.id,
    medianFee: block.extras.medianFee,
    totalFees: block.extras.totalFees,
    transactions: block.tx_count,
    blockSize: block.size,
    feeRange: block.extras.feeRange,
    timestamp: block.timestamp,
    height: block.height,
    data: block,
  } as IBlock;
};
