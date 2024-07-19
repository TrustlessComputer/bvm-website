import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text, Image, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomViewModule from '@/modules/customViewModule_v0';
import { IExploreItem } from '@/services/api/l2services/types';

type Props = {
  item: IExploreItem;
};

const Body = (props: Props) => {
  const { item } = props;

  return (
    <CustomViewModule
      chainName={item.chainInfo.name}
      selectedOptions={item.template || []}
    />
  );
};

export default Body;
