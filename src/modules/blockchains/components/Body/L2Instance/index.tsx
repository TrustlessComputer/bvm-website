'use client';

import { useAppDispatch } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import { Box, Divider, Flex } from '@chakra-ui/react';
// import BodyInfor from './BodyInfor';
import BodyInfor from './BodyInfor_V2';
import BottomView from './Bottom';
import HeaderRow from './HeaderRow';
import { useDashboard } from '@/modules/blockchains/providers/DashboardProvider';
import { getBridgeLink } from '@/services/api/l2services/constants';
import BreakLine from './BreakLine';

type Props = {
  item: OrderItem;
  onClick: () => void;
  isOwner?: boolean;
};

const L2Instance = (props: Props) => {
  const dispatch = useAppDispatch();

  const { item, onClick: onClickCB, isOwner } = props;

  const {
    onOpenBillingModal,
    onOpenEditConfigModal,
    onOpenCancelOrderModal,
    onOpenTopUpModal,
    onOpenUpdateOrderModal,
    onOpenDappList,
  } = useDashboard();

  const isProccessing = item.status === OrderStatus.Processing;

  return (
    <Flex flexDir={'column'} gap={'15px'} p={'5px'} bgColor={'transparent'}>
      <Box
        bgColor={'#fff'}
        flexDir={'column'}
        minH={'auto'}
        p={['10px', '20px', '30px', '40px']}
        borderRadius={'20px'}
        _hover={{
          cursor: isProccessing ? 'pointer' : '',
          borderColor: '#b6b7b7b1',
          boxShadow: 'md',
        }}
        onClick={() => {
          if (isProccessing) {
            onClickCB && onClickCB();
          }
        }}
      >
        <HeaderRow
          item={item}
          depositOnClick={() => {
            dispatch(setOrderSelected(item));
            onOpenTopUpModal && onOpenTopUpModal();
          }}
          editOnClick={() => {
            dispatch(setOrderSelected(item));
            onOpenUpdateOrderModal && onOpenUpdateOrderModal();
          }}
        />
        <Divider my={'20px'} borderColor="gray.200" />
        <BodyInfor item={item} />
        <BreakLine />
        {/* <BottomView
          item={item}
          isOwner={isOwner}
          viewBillingOnClick={() => {
            dispatch(setOrderSelected(item));
            onOpenBillingModal && onOpenBillingModal();
          }}
          bridgeOnClick={() => {
            dispatch(setOrderSelected(item));
            if (!item.isMainnet) {
              window.open(getBridgeLink(item.isMainnet, item.domain), '_blank');
            }
          }}
          editConfigBridgeOnClick={() => {
            dispatch(setOrderSelected(item));
            onOpenEditConfigModal && onOpenEditConfigModal();
          }}
          cancelOrderOnClick={() => {
            dispatch(setOrderSelected(item));
            onOpenCancelOrderModal && onOpenCancelOrderModal();
          }}
        /> */}
      </Box>
    </Flex>
  );
};

export default L2Instance;
