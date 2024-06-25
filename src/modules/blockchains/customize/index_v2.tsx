'use client';

import { Flex } from '@chakra-ui/react';
// import { BuyPage } from '../Buy';
import { BuyProvider } from '../providers/Buy.context';
import { BuyPage } from '../Buy/index_v2';
import s from './styles.module.scss';

export default () => {
  return (
    <div className={s.container}>
      <BuyProvider>
        <Flex maxWidth={'1480px'} w={'100%'} px={'20px'}>
          <BuyPage />
        </Flex>
      </BuyProvider>
    </div>
  );
};
