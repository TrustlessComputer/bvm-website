'use client';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import {
  allOrdersSelector,
  getL2ServicesStateSelector,
  orderListSelector,
} from '@/stores/states/l2services/selector';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import L2Instance from './L2Instance';
import { useDashboard } from '../../providers/DashboardProvider';

const BodyGridView = () => {
  const dispatch = useAppDispatch();
  const { onOpenOpenOrderDetailModal } = useDashboard();
  const myOrders = useAppSelector(orderListSelector);
  const allOrders = useAppSelector(allOrdersSelector);
  const { viewMode, showOnlyMyOrder, accountInforL2Service } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const serviceDataList = useMemo(() => {
    const filterByNetwork = (orders: OrderItem[]) => {
      if (viewMode === 'Mainnet')
        return orders
          .filter((order) => order.isMainnet)
          .sort((a, b) => b.index - a.index);
      if (viewMode === 'Testnet')
        return orders
          .filter((order) => !order.isMainnet)
          .sort((a, b) => b.index - a.index);
      return [];
    };
    if (showOnlyMyOrder) {
      return filterByNetwork(myOrders);
    } else if (!showOnlyMyOrder) {
      return filterByNetwork(allOrders);
    }
    return [];
  }, [myOrders, allOrders, viewMode, showOnlyMyOrder]);

  const isEmptyData = useMemo(() => {
    if (!serviceDataList || serviceDataList.length < 1) return true;
    return false;
  }, [serviceDataList]);

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
          No Bitcoin L2s available
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
      <SimpleGrid columns={[1, 2]} spacing="20px" width={'100%'} height={'80%'}>
        {serviceDataList.map((item, index) => (
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

  return (
    <Flex overflow={'hidden'}>
      {isEmptyData ? renderEmptyView() : renderDataList()}
    </Flex>
  );
};

export default BodyGridView;
