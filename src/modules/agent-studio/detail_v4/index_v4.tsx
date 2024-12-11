'use client';

import { Flex } from '@chakra-ui/react';
import { BuyProvider } from '../providers/Buy.context';
// import BuyPage from '../Buy/index_v5';
import BuyPage from '../Buy';
// import s from './styles_v2.module.scss';
import s from './styles.module.scss';
import { ReactFlowProvider } from '@xyflow/react';
import enhance from './enhance';
import { ChainProvider } from './provider/ChainProvider';

export const Page = (props: any) => {
  return (
    <ChainProvider orderData={props.chainDetailData}>
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
