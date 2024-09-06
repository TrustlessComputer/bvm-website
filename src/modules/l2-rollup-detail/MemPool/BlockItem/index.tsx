import { Box, Flex, Image, Skeleton, Square, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { IBlock, IConfirmedBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import { formatCurrency } from '@utils/format';
import BigNumberJS from 'bignumber.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { compareString } from '@utils/string';
import { MemPoolContext } from '@/modules/l2-rollup-detail/MemPool/provider/mempool-context';

dayjs.extend(relativeTime);

interface IProps {
  item: IBlock | undefined;
  loading: boolean;
  isPending?: boolean;
  index?: number;
  onSelect: any;
}

const BlockItem: React.FC<IProps> = ({
                                                 item,
                                                 loading,
                                                 index,
                                                 isPending,
                                                  onSelect
                                               }) => {
  const { selectedBlock } = useContext(MemPoolContext);
  const [poolImgUrl, setPoolImgUrl] = useState('');

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

  const isSelected = useMemo(() => {
    return compareString(item?.id, selectedBlock?.id);
  }, [item, selectedBlock]);

  if (loading) {
    return (
      <Box className={cs(s.container, status)}>
        <Skeleton w={"125px"} h={"125px"}></Skeleton>
      </Box>
    );
  }

  useEffect(() => {
    if(item && (item?.data as IConfirmedBlock)?.extras) {
      setPoolImgUrl(`https://mempool.space/resources/mining-pools/${(item?.data as IConfirmedBlock).extras.pool.slug}.svg`);
    }
  }, [item]);

  const onLoadPoolImgError = () => {
    setPoolImgUrl(`https://mempool.space/resources/mining-pools/default.svg`);
  }

  return (
    <Box className={cs(s.container, status)} onClick={() => onSelect(item)}>
      {item ? (
        <>
          {item.height && <Text className={s.blockHeight}>{item.height}</Text>}
          <Square size={"125px"} className={s.content}>
            <Flex direction={"column"} gap={"4px"} alignItems={'center'}>
              <Text className={s.medianFee}>~{formatCurrency(item?.medianFee, 0, 0)} sat/vB</Text>
              <Text className={s.feeSpan}>{formatCurrency(item?.feeRange[0], 0, 0)} - {formatCurrency(item?.feeRange[item.feeRange.length - 1], 0, 0)} sat/vB</Text>
              <Text className={s.totalFee}>{formatCurrency(new BigNumberJS(item?.totalFees).dividedBy(1e8).toFixed(3), 0, 3, 'BTC', true)} BTC</Text>
              <Text className={s.transactions}>{formatCurrency(item?.transactions, 0, 0)} transactions</Text>
              {
                isPending && index === 0 ? (
                  <Text className={s.time}>(125 blocks)</Text>
                ) : (
                  <Text className={s.time}>{dayjs.unix(item?.timestamp as number).fromNow()}</Text>
                )
              }
            </Flex>
          </Square>
          {item.height && (
            <Flex
              className={s.minedPool}
              w="100%"
              gap={"4px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                src={poolImgUrl}
                onError={onLoadPoolImgError}
                className={s.poolImg}
              />
              {(item?.data as IConfirmedBlock).extras.pool.name}
            </Flex>
          )}
        </>
      ) : (
        <Square size={"125px"} />
      )}
      {
        isSelected && <Box id={"arrow_up"} className={isPending ? s.arrowUpPending : s.arrowUp}/>
      }
    </Box>
  );
};

export default BlockItem;
