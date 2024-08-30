"use client";

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useContext, useMemo } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import BigNumber from 'bignumber.js';
import { IBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import BlockItem from 'src/modules/l2-rollup-detail/MemPool/BlockItem';
import {
  L2RollupDetailContext,
  L2RollupDetailProvider,
} from '@/modules/l2-rollup-detail/providers/l2-rollup-detail-context';
import BlockDetail from '@/modules/l2-rollup-detail/MemPool/BlockDetail';
import dayjs from 'dayjs';

const MemPool = () => {
  const { selectedBlock, pendingBlocks, confirmedBlocks } = useContext(L2RollupDetailContext);

  const listNFTs = useMemo(() => {
    let pendingNFTs: any[] = [];
    let claimedNFTS: any[] = [];

    const now = dayjs();
    let minutes = 0;
    pendingNFTs = pendingBlocks?.map(block => {
      return {
        medianFee: block.medianFee,
        totalFees: block.totalFees,
        transactions: block.nTx,
        blockSize: block.blockSize,
        feeRange: block.feeRange,
        timestamp: now.add(minutes+= 10, 'minutes').unix(),
        data: block,
      } as IBlock;
    }).reverse();

    claimedNFTS = confirmedBlocks?.map(block => {
      return {
        medianFee: block.extras.medianFee,
        totalFees: block.extras.totalFees,
        transactions: block.tx_count,
        blockSize: block.size,
        feeRange: block.extras.feeRange,
        timestamp: block.timestamp,
        height: block.height,
        data: block,
      } as IBlock;
    });

    return {
      pendingNFTs,
      claimedNFTS,
    };
  }, [pendingBlocks, confirmedBlocks]);

  // console.log('listNFTs', listNFTs);

  const isCenter = useMemo(() => {
    return new BigNumber(10).multipliedBy(177).lte(window.innerWidth);
  }, []);

  return (
    <Flex className={s.container} direction={"column"} alignItems={"center"}>
      <ScrollContainer
        className={s.wrapper}
        hideScrollbars={true}
        horizontal={true}
      >
        <Flex
          className={s.nftContainer}
          justifyContent={isCenter ? "center" : "flex-start"}
        >
          <Box minW={"16px"} />
          {listNFTs.pendingNFTs.map((_v, i) => (
            <BlockItem
              key={`pending-${i}`}
              item={_v}
              loading={false}
              isPending={true}
            />
          ))}

          <Box className={s.verticalLine} />

          {listNFTs.claimedNFTS.map((_v, i) => (
            <BlockItem
              key={`release-${i}`}
              item={_v}
              loading={false}
              isPending={false}
            />
          ))}
          <Box minW={"16px"} />
        </Flex>
      </ScrollContainer>
      {
        selectedBlock && <BlockDetail />
      }
    </Flex>
  )
};

const MemPoolModule = () => {
  return (
    <L2RollupDetailProvider>
      <MemPool />
    </L2RollupDetailProvider>
  )
}

export default MemPoolModule;
