import { OrderItem } from '@/stores/states/l2services/types';
import { Divider, Flex } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import Body from './Body';
import Bottom from './Bottom';
import { IExploreItem } from '@/services/api/l2services/types';

type Props = {
  orderItem: IExploreItem;
  cloneOnClick: () => void;
};

const ChainItem = (props: Props) => {
  const { orderItem, cloneOnClick } = props;

  return (
    <Flex
      w="100%"
      p={['20px']}
      alignItems={'center'}
      borderRadius={'8px'}
      bgColor={'#fff'}
      boxShadow="0px 0px 24px 0px #00000014"
      flexDir={'column'}
      gap={['20px']}
      style={{
        pointerEvents: 'none',
      }}
    >
      <Header orderItem={orderItem} />
      <Divider bgColor={'#ECECEC'} />
      <Body item={orderItem} />
      <Divider bgColor={'#ECECEC'} mt={['20px']} />
      <Bottom orderItem={orderItem} cloneOnClick={cloneOnClick} />
    </Flex>
  );
};

export default ChainItem;
