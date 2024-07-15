'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';
import useOrderMapper from '../../../hooks/useOrderMapper';
import s from './styles.module.scss';
import CustomViewModule from '@/modules/customViewModule_v0';

type Props = {
  orderItem: OrderItem;
};

const ChainDetailRightView = (props: Props) => {
  const { orderItem } = props;
  return (
    <CustomViewModule
      selectedOptions={orderItem.selectedOptions || []}
    ></CustomViewModule>
  );
};

export default ChainDetailRightView;
