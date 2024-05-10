'use client';

import { Flex } from '@chakra-ui/react';
import { BuyProvider } from '../providers/Buy.context';

export default () => {
  return (
    <Flex bgColor={'#f3f1e8'} flexDir={'column'} alignItems={'center'}>
      <Flex maxW={'1800px'} h={'100dvh'}>
        <BuyProvider>
          <p
            style={{
              color: 'black',
              alignSelf: 'center',
            }}
          >
            Payment Page (TO DO)
          </p>
        </BuyProvider>
      </Flex>
    </Flex>
  );
};
