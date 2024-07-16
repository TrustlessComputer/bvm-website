'use client';

import { Flex } from '@chakra-ui/react';
import { BuyProvider } from '../providers/Buy.context';
import BuyPage from '../Buy/index_v5';
import s from './styles_v2.module.scss';


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
        <Flex maxWidth={'1600px'} w={'100%'} px={['16px', '18px', '20px']}>
          <BuyPage />
        </Flex>
      </BuyProvider>
    </Flex>
  );
};
