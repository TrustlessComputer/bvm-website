import { Box, Flex, Image, Skeleton, Text } from '@chakra-ui/react';
import cs from 'classnames';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import s from './styles.module.scss';
import { compareString } from '@/utils/string';
import { IBlock } from '@/modules/l2-rollup-detail/MemPool/interface';

interface IProps {
  item: IBlock | undefined;
  loading: boolean;
  isCurrentMint?: boolean;
  index?: number;
}

const BlockItem: React.FC<IProps> = ({
                                                 item,
                                                 loading,
                                                 index,
                                                 isCurrentMint,
                                               }) => {
  const status = useMemo(() => {
    if (!item) {
      return;
    }
    if (compareString(item.release_tx_hash, "pending")) {
      return s.pending;
    }
    if (item.release_tx_hash) {
      return s.release;
    }
  }, [item?.release_tx_hash]);

  if (loading) {
    return (
      <Box className={cs(s.btnItemContainer, status)}>
        <Skeleton w={"125px"} h={"125px"}></Skeleton>
      </Box>
    );
  }

  return (
    <Box className={cs(s.btnItemContainer, status)}>
      {item ? (
        <>
          <Image src={item.image_url} />
          <Box pt={"8px"}>
            <Text className={s.name}>Block #{item.id}</Text>
            <Text className={s.name} style={{ opacity: 0.7 }} fontSize={"12px"}>
              Epoch {item.release_batch}
            </Text>
            <Flex flexDirection={"column"} justifyContent={"center"} mt={"6px"}>
              {compareString(item.release_tx_hash, "pending") ? (
                <>
                  <Text className={s.title}>Release at:</Text>
                  <Text className={s.value}>
                    {dayjs(item?.release_at).format("MM/DD/YYYY HH:mm")}
                  </Text>
                </>
              ) : (
                <>
                  <Text className={s.title}>Reward:</Text>
                  <Text className={s.value}>100K</Text>
                </>
              )}
            </Flex>
          </Box>
        </>
      ) : isCurrentMint ? (
        <>
          <Skeleton w={"125px"} h={"125px"}></Skeleton>
          {/*<Box pt={"8px"}>
            <Text className={s.name}>Queue Status</Text>
            <Text className={s.name} style={{ opacity: 0.7 }} fontSize={"12px"}>
               in queue
            </Text>

            <Flex flexDirection={"column"} justifyContent={"center"} mt={"6px"}>
              <Text className={s.title}>Completed at:</Text>
              <Text className={s.value}>
                {dayjs(START_FIRST_BLOCK)
                  .add(30 * (index || 1), "days")
                  .format("MM/DD/YYYY HH:mm")}
              </Text>
            </Flex>
          </Box>*/}
        </>
      ) : (
        <Box w={"125px"} h={"125px"}></Box>
      )}
    </Box>
  );
};

export default BlockItem;
