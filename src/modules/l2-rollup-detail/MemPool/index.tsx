"use client";

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useParams } from 'next/navigation';
import { useContext, useMemo, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import BigNumber from 'bignumber.js';
import { IBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import BlockItem from 'src/modules/l2-rollup-detail/MemPool/BlockItem';
import {
  L2RollupDetailContext,
  L2RollupDetailProvider,
} from '@/modules/l2-rollup-detail/providers/l2-rollup-detail-context';
import BlockDetail from '@/modules/l2-rollup-detail/MemPool/BlockDetail';

const MemPool = () => {
  const params = useParams();

  const defaultArr = useRef(Array(10).fill(0)).current;
  const defaultArr1 = useRef(Array(1).fill(0)).current;

  const chain = params?.id;

  const { selectedBlock, pendingBlocks } = useContext(L2RollupDetailContext);

  console.log('params', params);

  const listNFTs = useMemo(() => {
    let pendingNFTs: any[] = defaultArr;
    let claimedNFTS: any[] = defaultArr;

    pendingNFTs = pendingBlocks?.map(block => {
      return {
        feeSpan: block?.feeRange?.reduce((result, value) => result + value, 0) / block.feeRange.length,
        medianFee: block.medianFee,
        totalFees: block.totalFees,
        transactions: block.nTx,
        blockSize: block.blockSize,
        feeRange: block.feeRange,
        data: block,
      } as IBlock;
    }).reverse();
    claimedNFTS = Array(10).fill({release_tx_hash: 'release'});

    return {
      pendingNFTs,
      claimedNFTS,
    };
  }, [pendingBlocks]);

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
              loading={loading}
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
