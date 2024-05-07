'use client';

import { Divider, Flex, Box } from '@chakra-ui/react';
import BodyInfor from './BodyInfor';
import BottomInfor from './BottomInfor';
import HeaderRow from './HeaderRow';
import { OrderItem } from '@/stores/states/l2services/types';

type Props = {
  item: OrderItem;
  onClick: () => void;
  isOwner?: boolean;
};

const L2Instance = (props: Props) => {
  const { item, onClick, isOwner } = props;
  return (
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
        minH={'410px'}
        p={'20px'}
        _hover={{
          cursor: 'pointer',
          borderColor: '#b6b7b7b1',
          boxShadow: 'md',
        }}
      >
        <HeaderRow item={item} />
        <Divider my={'20px'} borderColor="gray.200" />
        <BodyInfor item={item} />
        <Divider my={'20px'} borderColor="gray.200" />
        <BottomInfor item={item} />
      </Box>
    </Flex>
  );
};

export default L2Instance;
