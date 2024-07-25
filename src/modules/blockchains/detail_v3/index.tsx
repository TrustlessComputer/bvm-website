'use client';

import { Flex } from '@chakra-ui/react';
import MainPage from './MainPage';
import enhance from './enhance';
import s from './styles.module.scss';
import { ChainDetailComponentProps } from './types';

const ChainDetailPage = (props: ChainDetailComponentProps) => {
  return (
    <Flex
      flexDir={'column'}
      px={['16px', '18px', '20px']}
      className={s.container}
    >
      <MainPage {...props} />
    </Flex>
  );
};

export default enhance(ChainDetailPage);
