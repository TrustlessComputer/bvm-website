'use client';

import { useAppDispatch } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import { OrderItem } from '@/stores/states/l2services/types';
import { Box, Divider, Flex } from '@chakra-ui/react';
import BodyInfor from './BodyInfor';
import BottomInfor from './BottomInfor';
import HeaderRow from './HeaderRow';
import { useDashboard } from '@/modules/blockchains/providers/DashboardProvider';
import { getBridgeLink } from '@/services/api/l2services/constants';

type Props = {
  item: OrderItem;
  onClick: () => void;
  isOwner?: boolean;
};

const L2Instance = (props: Props) => {
  const dispatch = useAppDispatch();

  const { item, onClick, isOwner } = props;

  const {
    onOpenBillingModal,
    onOpenEditConfigModal,
    onOpenCancelOrderModal,
    onOpenTopUpModal,
  } = useDashboard();

  return (
    <>
      <Flex
        flexDir={'column'}
        gap={'15px'}
        p={'5px'}
        bgColor={'transparent'}
        onClick={onClick}
      >
        <Box
          bgColor={'#fff'}
          flexDir={'column'}
          minH={'auto'}
          p={'40px'}
          borderRadius={'20px'}
          _hover={{
            cursor: 'pointer',
            borderColor: '#b6b7b7b1',
            boxShadow: 'md',
          }}
        >
          <HeaderRow
            item={item}
            depositOnClick={() => {
              dispatch(setOrderSelected(item));
              onOpenTopUpModal && onOpenTopUpModal();
            }}
          />
          <Divider my={'20px'} borderColor="gray.200" />
          <BodyInfor item={item} />
          {/* <Divider my={'20px'} borderColor="gray.200" /> */}
          <BottomInfor
            item={item}
            isOwner={isOwner}
            viewBillingOnClick={() => {
              dispatch(setOrderSelected(item));
              onOpenBillingModal && onOpenBillingModal();
            }}
            bridgeOnClick={() => {
              dispatch(setOrderSelected(item));
              if (!item.isMainnet) {
                window.open(
                  getBridgeLink(item.isMainnet, item.domain),
                  '_blank',
                );
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
          />
        </Box>
      </Flex>
    </>
  );
};

export default L2Instance;
