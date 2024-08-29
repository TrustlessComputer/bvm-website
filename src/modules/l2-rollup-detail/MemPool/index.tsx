"use client";

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
  const [loading, setLoading] = useState(true);

  const [nfts, setNfts] = useState<IBlock[]>([]);
  const defaultArr = useRef(Array(10).fill(0)).current;
  const defaultArr1 = useRef(Array(1).fill(0)).current;

  const chain = params?.id;

  const { selectedBlock } = useContext(L2RollupDetailContext);

  console.log('params', params);

  useEffect(() => {
    getData();
  }, [chain]);

  const getData = async () => {
    try {
      setNfts(Array(10).fill(0));

      if (!chain) {
        setNfts([]);
        return;
      }
      // const rs = await nftApi.getCollectedNFTs("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const listNFTs = useMemo(() => {
    let pendingNFTs: any[] = loading ? defaultArr : defaultArr1;
    let claimedNFTS: any[] = defaultArr;

    if (nfts.length > 0) {
      pendingNFTs = Array(10).fill({release_tx_hash: 'pending'});
      claimedNFTS = Array(10).fill({release_tx_hash: 'release'});

      // if (pendingNFTs.length < defaultArr1.length) {
      //   pendingNFTs = Array(defaultArr1.length - pendingNFTs.length)
      //     .fill(0)
      //     .concat(pendingNFTs);
      // }
      // if (claimedNFTS.length < defaultArr.length) {
      //   claimedNFTS = claimedNFTS.concat(
      //     Array(defaultArr.length - claimedNFTS.length).fill(0)
      //   );
      // }
    }

    return {
      pendingNFTs,
      claimedNFTS,
    };
  }, [nfts, loading]);

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
              loading={loading}
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
