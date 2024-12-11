'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';
import useOrderMapper from '../../../hooks/useOrderMapper';
import s from './styles.module.scss';

import ChainDetailLeftView from './ChainDetail.LeftView';
import ChainDetailRightView from './ChainDetail.RightView';

type Props = {
  orderItem: OrderItem;
};

const ChainDetailBody = (props: Props) => {
  const { orderItem } = props;
  return (
    <Flex flexDir={['column', 'column', 'row']} gap={['40px']}>
      <Flex
        flex={1}
        flexDir={'column'}
        borderRadius={'20px'}
        border={'1px solid #E0E0E0'}
        p={['28px']}
        bgColor={'#fff'}
      >
        <ChainDetailLeftView orderItem={orderItem} />
      </Flex>

      <Flex
        flex={1}
        flexDir={'column'}
        borderRadius={'20px'}
        border={'1px solid #E0E0E0'}
        p={['28px']}
        bgColor={'#fff'}
      >
        <ChainDetailRightView orderItem={orderItem} />
      </Flex>
    </Flex>
  );
};

export default ChainDetailBody;
