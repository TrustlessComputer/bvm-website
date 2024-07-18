import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text, Image, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomViewModule from '@/modules/customViewModule_v0';

type Props = {
  orderItem: OrderItem;
};

const Body = (props: Props) => {
  const { orderItem } = props;

  return (
    <CustomViewModule
      orderItem={orderItem}
      selectedOptions={orderItem?.selectedOptions || []}
    />
  );
};

export default Body;
