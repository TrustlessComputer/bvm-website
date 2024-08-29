import { Box, Flex, Skeleton, Square, Text } from '@chakra-ui/react';
import cs from 'classnames';
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
  console.log('BlockItem', item);

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
      <Box className={cs(s.container, status)}>
        <Skeleton w={"125px"} h={"125px"}></Skeleton>
      </Box>
    );
  }

  return (
    <Box className={cs(s.container, status)}>
      {item ? (
        <Square size={"125px"} className={s.content}>
          <Flex direction={"column"} gap={"4px"} alignItems={'center'}>
            <Text className={s.medianFee}>~2 sat/vB</Text>
            <Text className={s.feeSpan}>2-3 sat/vB</Text>
            <Text className={s.totalFee}>0.07 BTC</Text>
            <Text className={s.transactions}>2,125 transactions</Text>
            <Text className={s.time}>In ~20 minutes</Text>
          </Flex>
        </Square>
      ) : (
        <Square size={"125px"} />
      )}
    </Box>
  );
};

export default BlockItem;
