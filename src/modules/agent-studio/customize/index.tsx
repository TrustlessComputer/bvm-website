'use client';

import { Flex } from '@chakra-ui/react';
import PageDetal from '../Buy/index';
import s from './styles_v6.module.scss';
import { ReactFlowProvider } from '@xyflow/react';
import { ChainProvider } from '../detail_v4/provider/ChainProvider';
import enhance from '../detail_v4/enhance_create_flow/index';

const Page = () => {
  return (
    <ReactFlowProvider>
      <Flex
        flex={1}
        flexDir={'column'}
        align={'center'}
        // py={['10px', '20px', '30px', '50px']}
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
