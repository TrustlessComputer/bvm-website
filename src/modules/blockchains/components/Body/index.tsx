'use client';

import { useAppSelector } from '@/stores/hooks';
import {
  allOrdersSelector,
  getL2ServicesStateSelector,
  orderListSelector,
} from '@/stores/states/l2services/selector';
import { Flex, SimpleGrid, Text, Image } from '@chakra-ui/react';
import L2Instance from './L2Instance';
import { useMemo, useState } from 'react';
import {
  ListType,
  NetworkType,
  OrderItem,
} from '@/stores/states/l2services/types';
import ItemDetailModal from '../ItemDetailModal';

const BodyGridView = () => {
  const myOrders = useAppSelector(orderListSelector);
  const allOrders = useAppSelector(allOrdersSelector);
  const { viewMode, showOnlyMyOrder } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const [showItemDetailModal, setShowItemDetailModal] = useState(false);
  const [itemDetailSelected, setItemDetailSelected] = useState<
    undefined | OrderItem
  >(undefined);

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
        {serviceDataList.map((item) => (
          <L2Instance
            item={item}
            isOwner={true}
            onClick={() => {
              setShowItemDetailModal(true);
              setItemDetailSelected(item);
            }}
          />
        ))}
      </SimpleGrid>
    );
  };

  console.log('serviceDataList 12345 ', serviceDataList);

  return (
    <Flex overflow={'hidden'}>
      {isEmptyData ? renderEmptyView() : renderDataList()}
      {showItemDetailModal && itemDetailSelected && (
        <ItemDetailModal
          show={showItemDetailModal}
          item={itemDetailSelected!}
          onClose={() => {
            setShowItemDetailModal(false);
          }}
          onSuccess={async () => {}}
        />
      )}
    </Flex>
  );
};

export default BodyGridView;
