'use client';

import { Flex } from '@chakra-ui/react';

import { BuyProvider } from '../providers/Buy.context';
import RollupsDappPage from './page';

import styles from './styles.module.scss';

export default () => {
  return (
    <BuyProvider>
      <Flex
        flex={1}
        flexDir={'column'}
        align={'center'}
        className={styles.container}
      >
        <Flex w={'100%'} px={['16px', '18px', '20px']}>
          <RollupsDappPage />
        </Flex>
      </Flex>
    </BuyProvider>
  );
};
