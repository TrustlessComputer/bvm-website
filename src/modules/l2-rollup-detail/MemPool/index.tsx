"use client";

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { IBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import BlockItem from 'src/modules/l2-rollup-detail/MemPool/BlockItem';
import {
  L2RollupDetailContext,
  L2RollupDetailProvider,
} from '@/modules/l2-rollup-detail/providers/l2-rollup-detail-context';
import BlockDetail from '@/modules/l2-rollup-detail/MemPool/BlockDetail';
import dayjs from 'dayjs';

const MemPool = () => {
  const { selectedBlock, setSelectedBlock, pendingBlocks, confirmedBlocks, fetchConfirmedBlocks } = useContext(L2RollupDetailContext);
  const scrollRef = useRef(null);

  const listNFTs = useMemo(() => {
    let pendingNFTs: any[] = [];
    let claimedNFTS: any[] = [];

    const now = dayjs();
    let minutes = 0;
    pendingNFTs = pendingBlocks?.map((block, i) => {
      return {
        id: i.toString(),
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
    });

    return {
      pendingNFTs,
      claimedNFTS,
    };
  }, [pendingBlocks, confirmedBlocks]);

  useEffect(() => {
    if(listNFTs?.pendingNFTs?.length > 0 && !selectedBlock) {
      setSelectedBlock(listNFTs.pendingNFTs[listNFTs.pendingNFTs.length - 1]);
    }
  }, [listNFTs.pendingNFTs, selectedBlock]);

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      const item = document.getElementById('item-to-center');

      if(item) {
        item.scrollIntoView({
          behavior: 'smooth',
          inline: 'center'
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutRef);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = scrollRef.current as unknown as HTMLElement;

      if((element.scrollWidth - element.scrollLeft - element.clientWidth <= 600)) {
        fetchConfirmedBlocks(true);
      }
    }

    const element = scrollRef.current as unknown as HTMLElement;
    if(element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      const element = scrollRef.current as unknown as HTMLElement;
      if(element) {
        element.removeEventListener('scroll', handleScroll);
      }
    }
  }, [fetchConfirmedBlocks]);

  return (
    <Flex className={s.container} direction={"column"} alignItems={"center"}>
      <ScrollContainer
        className={s.wrapper}
        hideScrollbars={true}
        horizontal={true}
        vertical={false}
        innerRef={scrollRef}
      >
        <Box minW={"16px"} />
        {listNFTs.pendingNFTs.map((_v, i) => (
          <BlockItem
            key={`pending-${i}`}
            item={_v}
            loading={false}
            isPending={true}
            index={i}
          />
        ))}

        {listNFTs?.claimedNFTS?.length > 0 && (
          <Box className={s.verticalLine} id={"item-to-center"} />
        )}

        {listNFTs.claimedNFTS.map((_v, i) => (
          <BlockItem
            key={`release-${i}`}
            item={_v}
            loading={false}
            isPending={false}
            index={i}
          />
        ))}
        <Box minW={"16px"} />
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
