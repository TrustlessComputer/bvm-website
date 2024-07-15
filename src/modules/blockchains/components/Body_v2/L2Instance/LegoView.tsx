'use client';

import CustomViewModule from '@/modules/customViewModule_v0';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex } from '@chakra-ui/react';

type Props = {
  item: OrderItem;
};

const LegonChain = (props: Props) => {
  const { item } = props;
  return <CustomViewModule selectedOptions={item.selectedOptions || []} />;
};

export default LegonChain;
