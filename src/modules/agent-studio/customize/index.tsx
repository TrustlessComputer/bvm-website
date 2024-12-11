'use client';

import { Flex } from '@chakra-ui/react';
import { ReactFlowProvider } from '@xyflow/react';
import PageDetal from '../Buy/index';
import enhance from '../detail_v4/enhance_create_flow/index';
import s from './styles.module.scss';

const Page = () => {
  return (
    <ReactFlowProvider>
      <Flex
        flex={1}
        flexDir={'column'}
        align={'center'}
        className={s.container}
      >
        <Flex w={'100%'} px={['16px', '18px', '20px']}>
          <PageDetal />
        </Flex>
      </Flex>
    </ReactFlowProvider>
  );
};

export default enhance(Page);
