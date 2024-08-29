"use client";

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import BigNumber from 'bignumber.js';
import { IBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import BlockItem from '@/modules/l2-rollup-detail/MemPool/block';

export const START_FIRST_BLOCK = "2024-04-22 07:50:19";
export const START_FIRST_BLOCK_NUMBER = 1;

const MemPoolModule = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const [nfts, setNfts] = useState<IBlock[]>([]);
  const defaultArr = useRef(Array(5).fill(0)).current;
  const defaultArr1 = useRef(Array(1).fill(0)).current;

  const chain = params?.id;

  console.log('params', params);

  useEffect(() => {
    getData();
  }, [chain]);

  const getData = async () => {
    try {
      if (!chain) {
        setNfts([]);
        return;
      }
      // const rs = await nftApi.getCollectedNFTs("");
      // setNfts(rs);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const listNFTs = useMemo(() => {
    let pendingNFTs: any[] = loading ? defaultArr : defaultArr1;
    let claimedNFTS: any[] = defaultArr;

    if (nfts.length > 0) {
      // pendingNFTs = sortBy(
      //   filter(nfts, (v: INFT) => compareString(v.release_tx_hash, "pending")),
      //   "release_batch"
      // ).reverse();
      // claimedNFTS = filter(
      //   nfts,
      //   (v: INFT) =>
      //     !compareString(v.release_tx_hash, "pending") && v.active === true
      // );
      if (pendingNFTs.length < defaultArr1.length) {
        pendingNFTs = Array(defaultArr1.length - pendingNFTs.length)
          .fill(0)
          .concat(pendingNFTs);
      }
      if (claimedNFTS.length < defaultArr.length) {
        claimedNFTS = claimedNFTS.concat(
          Array(defaultArr.length - claimedNFTS.length).fill(0)
        );
      }
    }

    return {
      pendingNFTs,
      claimedNFTS,
    };
  }, [nfts, loading]);

  const isCenter = useMemo(() => {
    return new BigNumber(10).multipliedBy(177).lte(window.innerWidth);
  }, []);

  const currentQueue = useMemo(() => {
    return 5;
    // return firstEpoch.release_batch
    //   ? Number(firstEpoch.release_batch) - START_FIRST_BLOCK_NUMBER
    //   : 4;
  }, []);

  return (
    <Flex className={s.container}>
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
          {!loading &&
            Array(currentQueue)
              .fill(0)
              .map((_v, i) => (
                <BlockItem
                  key={`pending-${i}`}
                  item={undefined}
                  isCurrentMint={true}
                  loading={loading}
                  index={i + 1}
                />
              ))
              .reverse()}

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
    </Flex>
  )
};

export default MemPoolModule;
