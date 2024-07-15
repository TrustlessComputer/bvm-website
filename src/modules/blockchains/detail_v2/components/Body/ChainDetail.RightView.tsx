'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';
import useOrderMapper from '../../../hooks/useOrderMapper';
import s from './styles.module.scss';

type Props = {
  orderItem: OrderItem;
};

const ChainDetailRightView = (props: Props) => {
  const { orderItem } = props;

  const mapper = useOrderMapper(orderItem);

  return <Flex flexDir={'column'} className={s.container}></Flex>;
};

export default ChainDetailRightView;
