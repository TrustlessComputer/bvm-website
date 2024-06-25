'use client';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Image, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import L2Instance from './L2Instance';

type Props = {
  dataList: OrderItem[];
};

const BodyGridView = (porps: Props) => {
  const { dataList } = porps;
  const dispatch = useAppDispatch();
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
      <SimpleGrid columns={[1, 1]} spacing="20px" width={'100%'} height={'80%'}>
        {dataList.map((item, index) => (
          <L2Instance
            key={`${item.domain}-${index}`}
            item={item}
            isOwner={false}
            onClick={() => {
              dispatch(setOrderSelected(item));
            }}
          />
        ))}
      </SimpleGrid>
    );
  };

  const renderSekeleton = () => {
    return (
      <SimpleGrid columns={[1, 1]} spacing="20px" width={'100%'} height={'80%'}>
        {new Array(4).fill(0).map((item, index) => {
          return (
            <Skeleton
              key={`${item}-${index}`}
              w={'100%'}
              height={'300px'}
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
