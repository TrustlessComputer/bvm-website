import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text, Image, SimpleGrid, Button } from '@chakra-ui/react';
import React, { useState } from 'react';

type Props = {
  orderItem?: OrderItem;
  cloneOnClick: () => void;
};

const Bottom = (props: Props) => {
  const { cloneOnClick } = props;

  return (
    <Flex flex={1} align={'center'} justify={'center'}>
      <Button
        bgColor={'#FA4E0E'}
        borderRadius={'24px'}
        w={['200px']}
        flexShrink={0}
        fontSize={['15px']}
        fontWeight={600}
        _hover={{
          cursor: 'pointer',
          opacity: 0.7,
        }}
        onClick={cloneOnClick}
      >
        Clone
      </Button>
    </Flex>
  );
};

export default Bottom;
