import { Box, Flex, Skeleton, Square, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useContext, useMemo } from 'react';
import s from './styles.module.scss';
import { IBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import { L2RollupDetailContext } from '@/modules/l2-rollup-detail/providers/l2-rollup-detail-context';
import { formatCurrency } from '@utils/format';
import BigNumberJS from 'bignumber.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

interface IProps {
  item: IBlock | undefined;
  loading: boolean;
  isPending?: boolean;
  index?: number;
}

const BlockItem: React.FC<IProps> = ({
                                                 item,
                                                 loading,
                                                 index,
                                                 isPending,
                                               }) => {
  const { setSelectedBlock } = useContext(L2RollupDetailContext);

  const status = useMemo(() => {
    if (!item) {
      return;
    }
    if (isPending) {
      return s.pending;
    } else {
      return s.release;
    }
  }, [isPending]);

  if (loading) {
    return (
      <Box className={cs(s.container, status)}>
        <Skeleton w={"125px"} h={"125px"}></Skeleton>
      </Box>
    );
  }

  const onSelectBlock = () => {
    setSelectedBlock(item);
  }

  return (
    <Box className={cs(s.container, status)} onClick={onSelectBlock}>
      {item ? (
        <>
          {item.height && <Text className={s.blockHeight}>{item.height}</Text>}
          <Square size={"125px"} className={s.content}>
            <Flex direction={"column"} gap={"4px"} alignItems={'center'}>
              <Text className={s.medianFee}>~{formatCurrency(item?.medianFee, 0, 0)} sat/vB</Text>
              <Text className={s.feeSpan}>{formatCurrency(item?.feeRange[0], 0, 0)} - {formatCurrency(item?.feeRange[item.feeRange.length - 1], 0, 0)} sat/vB</Text>
              <Text className={s.totalFee}>{formatCurrency(new BigNumberJS(item?.totalFees).dividedBy(1e8).toFixed(3), 0, 3, 'BTC', true)} BTC</Text>
              <Text className={s.transactions}>{formatCurrency(item?.transactions, 0, 0)} transactions</Text>
              <Text className={s.time}>{dayjs.unix(item?.timestamp as number).fromNow()}</Text>
            </Flex>
          </Square>
        </>
      ) : (
        <Square size={"125px"} />
      )}
    </Box>
  );
};

export default BlockItem;
