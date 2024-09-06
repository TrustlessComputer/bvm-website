"use client";

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { IBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import BlockItem from 'src/modules/l2-rollup-detail/MemPool/BlockItem';
import BlockDetail from '@/modules/l2-rollup-detail/MemPool/BlockDetail';
import Loading from '@components/Loading';
import { MemPoolContext, MemPoolProvider } from '@/modules/l2-rollup-detail/MemPool/provider/mempool-context';

const MemPool = () => {
  const { selectedBlock, pendingBlocks, confirmedBlocks, fetchConfirmedBlocks, setIdSelectedPendingBlock, setIdSelectedConfirmedBlock, newConfirmedBlocks } = useContext(MemPoolContext);
  const scrollRef = useRef(null);
  const [loadMore, setLoadMore] = useState(false);

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

      if((element.scrollWidth - element.scrollLeft - element.clientWidth <= 800)) {
        if(!loadMore) {
          setLoadMore(true);
          fetchConfirmedBlocks(true);
        }
      } else {
        setLoadMore(false);
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
  }, [loadMore, fetchConfirmedBlocks]);

  const handleSelectPendingBlock = (block: IBlock) => {
    setIdSelectedPendingBlock(block.id);
    setIdSelectedConfirmedBlock('');
  }

  const handleSelectConfirmedBlock = (block: IBlock) => {
    setIdSelectedConfirmedBlock(block.id);
    setIdSelectedPendingBlock('');
  }

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
        {pendingBlocks.map((_v, i) => (
          <BlockItem
            key={`pending-${i}`}
            item={_v}
            loading={false}
            isPending={true}
            index={i}
            onSelect={handleSelectPendingBlock}
          />
        ))}

        {confirmedBlocks?.length > 0 && (
          <Box className={s.verticalLine} id={"item-to-center"} />
        )}

        {newConfirmedBlocks.map((_v, i) => (
          <BlockItem
            key={`new-confirmed-${i}`}
            item={_v}
            loading={false}
            isPending={false}
            index={i}
            onSelect={handleSelectConfirmedBlock}
          />
        ))}

        {confirmedBlocks.map((_v, i) => (
          <BlockItem
            key={`confirmed-${i}`}
            item={_v}
            loading={false}
            isPending={false}
            index={i}
            onSelect={handleSelectConfirmedBlock}
          />
        ))}
        <Box minW={"16px"} />
        {
          loadMore && (
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Loading />
            </Flex>
          )
        }
      </ScrollContainer>
      {
        selectedBlock && <BlockDetail />
      }
    </Flex>
  )
};

const MemPoolModule = () => {
  return (
    <MemPoolProvider>
      <MemPool />
    </MemPoolProvider>
  )
}

export default MemPoolModule;
