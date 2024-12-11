'use client';

import { BuyProvider } from '../providers/Buy.context';
import { BuyPage } from '../Buy';
import { Flex } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import { useEffect } from 'react';
import useL2Service from '@/hooks/useL2Service';

export default () => {
  return (
    <Flex bgColor={'#f3f1e8'} flexDir={'column'} alignItems={'center'}>
      <BoxContent minH={'100dvh'} overflow={'hidden'} py={'40px'}>
        <BuyProvider>
          <BuyPage />
        </BuyProvider>
      </BoxContent>
    </Flex>
  );
};
