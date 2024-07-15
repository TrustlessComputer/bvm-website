'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import useOrderMapper from '../../../hooks/useOrderMapper';
import s from './styles.module.scss';
// import HeaderRow from '@/modules/blockchains/components/Body/L2Instance/HeaderRow';

import HeaderLeftView from './HeaderLeftView';
import HeaderRightView from './HeaderRightView';

type Props = {
  orderItem: OrderItem;
};

const ChainDetailHeader = (props: Props) => {
  const { orderItem } = props;

  const mapper = useOrderMapper(orderItem);

  return (
    <Flex
      flexDir={['column', 'column', 'row']}
      w={'100%'}
      gap={'20px'}
      minH={'100px'}
      alignItems={['flex-start', 'flex-start', 'center']}
      justifyContent={'space-between'}
    >
      <HeaderLeftView orderItem={orderItem} />
      <HeaderRightView orderItem={orderItem} />
    </Flex>
  );
};

export default ChainDetailHeader;
