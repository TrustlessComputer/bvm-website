'use client';

import { Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import MainPage from './Page';

const Page = () => {
  return (
    <Flex
      flexDir={'column'}
      px={['16px', '18px', '20px']}
      className={s.container}
    >
      <MainPage />
    </Flex>
  );
};

export default Page;
