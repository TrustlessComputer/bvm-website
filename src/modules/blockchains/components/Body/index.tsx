'use client';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import {
  allOrdersSelector,
  getL2ServicesStateSelector,
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
import s from './styleFont.module.scss';
import useL2Service from '@/hooks/useL2Service';

const BodyGridView = () => {
  const dispatch = useAppDispatch();
  const { onOpenOpenOrderDetailModal } = useDashboard();
  const { getMyOrderList } = useL2Service();
  // const allOrders = useAppSelector(allOrdersSelector);
  const myOrders = useAppSelector(myOrderListSelector);
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
      <SimpleGrid columns={[1, 1]} spacing="20px" width={'100%'} height={'80%'}>
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

  // if (isMyOrderListFetched && !loggedIn) {
  //   return (
  //     <Button
  //       bgColor={'#000'}
  //       color={'#fff'}
  //       mt={'30px'}
  //       px="12px"
  //       py="8px"
  //       borderRadius={'100px'}
  //       w={'100px'}
  //       fontSize={'14px'}
  //       alignSelf={'center'}
  //       className={s.fontSFProDisplay}
  //       onClick={() => {
  //         setShowLoginModalCustomize && setShowLoginModalCustomize(true);
  //       }}
  //       _hover={{
  //         cursor: 'pointer',
  //         opacity: 0.8,
  //       }}
  //     >
  //       Connect
  //     </Button>
  //   );
  // }

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
