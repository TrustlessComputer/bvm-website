'use client';

import { Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { BuyProvider } from '@/modules/blockchains/providers/Buy.context';
import BuyPage from './Buy';
import ReactBlocklyComponent from '@/modules/apps/Buy2';


export default () => {
  return (
    <Flex
      flex={1}
      flexDir={'column'}
      align={'center'}
      // py={['10px', '20px', '30px', '50px']}
      className={s.container}
    >
      <BuyProvider>
        <Flex h={"100%"} w={'100%'} px={['16px', '18px', '20px']} direction={"column"}>
          <BuyPage />
          <ReactBlocklyComponent />
        </Flex>
      </BuyProvider>
    </Flex>
  );
};
