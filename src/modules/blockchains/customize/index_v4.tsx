'use client';

import { Flex } from '@chakra-ui/react';
import { BuyProvider } from '../providers/Buy.context';
// import BuyPage from '../Buy/index_v5';
import BuyPage from '../Buy/index_v8';
// import s from './styles_v2.module.scss';
import s from './styles_v6.module.scss';
import { ReactFlowProvider } from '@xyflow/react';
import { ChainProvider } from '../detail_v4/provider/ChainProvider';
import enhance from '../detail_v4/enhance_create_flow/index';

const Page = () => {
  return (
    <ChainProvider>
      <ReactFlowProvider>
        <Flex
          flex={1}
          flexDir={'column'}
          align={'center'}
          // py={['10px', '20px', '30px', '50px']}
          className={s.container}
        >
          <BuyProvider>
            <Flex w={'100%'} px={['16px', '18px', '20px']}>
              <BuyPage />
            </Flex>
          </BuyProvider>
        </Flex>
      </ReactFlowProvider>
    </ChainProvider>
  );
};

export default enhance(Page);
