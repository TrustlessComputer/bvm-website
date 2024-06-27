'use client';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import {
  allOrdersSelector,
  getL2ServicesStateSelector,
  myOrderListFilteredByNetwork,
  myOrderListSelector,
  orderListSelector,
} from '@/stores/states/l2services/selector';
import { OrderItem } from '@/stores/states/l2services/types';
import {
  Flex,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  Button,
} from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import L2Instance from './L2Instance';
import { useDashboard } from '../../providers/DashboardProvider';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import useL2Service from '@/hooks/useL2Service';

const BodyGridView = () => {
  const dispatch = useAppDispatch();
  const { onOpenOpenOrderDetailModal } = useDashboard();
  const { getMyOrderList } = useL2Service();
  // const allOrders = useAppSelector(allOrdersSelector);
  const myOrders = useAppSelector(myOrderListFilteredByNetwork);
  const { accountInforL2Service, isMyOrderListFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const isEmptyData = useMemo(() => {
    if (myOrders.length < 1) return true;
    return false;
  }, [myOrders]);

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
        {myOrders.map((item, index) => (
          <L2Instance
            key={`${item.domain}-${index}`}
            item={item}
            isOwner={item.tcAddress === accountInforL2Service?.tcAddress}
            onClick={() => {
              dispatch(setOrderSelected(item));
              onOpenOpenOrderDetailModal && onOpenOpenOrderDetailModal();
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
      {!isMyOrderListFetched
        ? renderSekeleton()
        : isEmptyData
        ? renderEmptyView()
        : renderDataList()}
    </Flex>
  );
};

export default BodyGridView;
