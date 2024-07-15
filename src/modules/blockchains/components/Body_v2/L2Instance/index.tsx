'use client';

import { useAppDispatch } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import { OrderItem } from '@/stores/states/l2services/types';
import { Box, Divider, Flex } from '@chakra-ui/react';
// import BodyInfor from './BodyInfor';
import { useDashboard } from '@/modules/blockchains/providers/DashboardProvider';
import HeaderRow from './HeaderRow_v2';
import LegoView from './LegoView';

type Props = {
  item: OrderItem;
  onClick: () => void;
  isOwner?: boolean;
};

const L2Instance = (props: Props) => {
  const dispatch = useAppDispatch();

  const { item, onClick: onClickCB, isOwner } = props;

  const { onOpenTopUpModal, onOpenUpdateOrderModal } = useDashboard();

  return (
    <Flex flexDir={'column'} gap={'15px'} p={'5px'} bgColor={'transparent'}>
      <Box
        bgColor={'#fff'}
        flexDir={'column'}
        minH={'auto'}
        p={['10px', '20px', '30px', '40px']}
        borderRadius={'20px'}
        _hover={{
          cursor: 'pointer',
          borderColor: '#b6b7b7b1',
          boxShadow: 'md',
        }}
        onClick={() => {
          // if (isProccessing) {
          //   onClickCB && onClickCB();
          // }
          onClickCB && onClickCB();
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
        <LegoView item={item} />
        <Divider my={'20px'} borderColor="gray.200" />
      </Box>
    </Flex>
  );
};

export default L2Instance;
