'use client';

import { BuyProvider } from '../providers/Buy.context';
import { BuyPage } from '../Buy';
import { Flex } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import { useEffect } from 'react';
import useL2Service from '@/hooks/useL2Service';

export default () => {
  const { onVerifyLoginFirstTime } = useL2Service();

  useEffect(() => {
    onVerifyLoginFirstTime();
  }, []);

  return (
    <Flex bgColor={'#f3f1e8'} flexDir={'column'} alignItems={'center'}>
      {/* <Flex maxW={'1800px'}>
          <BuyProvider>
            <BuyPage />
          </BuyProvider>
      </Flex> */}

      <BoxContent minH={'100dvh'} overflow={'hidden'} py={'40px'}>
        <BuyProvider>
          <BuyPage />
        </BuyProvider>
      </BoxContent>
    </Flex>
  );
};
