'use client';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Image, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useDashboard } from '../../providers/DashboardProvider';
import L2Instance from './L2Instance';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';

type Props = {
  dataList: OrderItem[];
};

const BodyGridView = (props: Props) => {
  const { dataList } = props;
  const dispatch = useAppDispatch();
  const { onOpenWaittingSetingUp } = useDashboard();
  const { isFetchedAllOrdersV2 } = useAppSelector(getL2ServicesStateSelector);

  const isEmptyData = useMemo(() => {
    if (dataList.length < 1) return true;
    return false;
  }, [dataList]);

  const renderEmptyView = () => {
    return (
      <Flex
        flexDir={'column'}
        flex={1}
        height={'300px'}
        width={'100%'}
        align={'center'}
        justify={'center'}
      >
        <Text fontSize={'25px'} fontWeight={700} color={'#000'}>
          No rollups available
        </Text>
        <Image
          src={'/blockchains/customize/ic-empty.svg'}
          w={'150px'}
          h={'auto'}
          objectFit={'contain'}
          style={{ filter: 'invert(100%)' }}
        />
      </Flex>
    );
  };

  const renderDataList = () => {
    return (
      <SimpleGrid columns={[1, 1]} w={'100%'}>
        {dataList.map((item, index) => (
          <L2Instance
            key={`${item.domain}-${index}`}
            item={item}
            onClick={() => {
              dispatch(setOrderSelected(item));
              onOpenWaittingSetingUp && onOpenWaittingSetingUp();
            }}
          />
        ))}
      </SimpleGrid>
    );
  };

  const renderSekeleton = () => {
    return (
      <SimpleGrid
        columns={[1, 1]}
        spacing="20px"
        w={'100%'}
        // bgColor={'red'}
        py={['5px', '10px', '20px']}
        px={['10px', '5px', '0px']}
      >
        {new Array(4).fill(0).map((item, index) => {
          return (
            <Skeleton
              key={`${item}-${index}`}
              w={'100%'}
              height={'400px'}
              startColor="#2f2f2f"
              endColor="#656565"
              borderRadius={'20px'}
            ></Skeleton>
          );
        })}
      </SimpleGrid>
    );
  };

  return (
    <Flex overflow={'hidden'}>
      {!isFetchedAllOrdersV2
        ? renderSekeleton()
        : isEmptyData
        ? renderEmptyView()
        : renderDataList()}
    </Flex>
  );
};

export default BodyGridView;
