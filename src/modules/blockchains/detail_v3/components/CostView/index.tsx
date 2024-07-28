'use client';

import { Flex, Text } from '@chakra-ui/react';

type Props = {
  priceBVM?: string;
  priceBVM2USD?: string;
};

const CostView = (props: Props) => {
  const { priceBVM, priceBVM2USD } = props;
  return (
    <Flex flexDir={'row'} align={'center'} justify={'flex-end'} gap={['24px']}>
      <Flex flexDir={'column'} align={'flex-start'} justify={'flex-start'}>
        <Text fontSize={['18px']} fontWeight={500} color={'#333333'}>
          {`${priceBVM || '--'} BVM/month`}
        </Text>
        <Text fontSize={['13px']} fontWeight={400} color={'#777777'}>
          {`$${priceBVM2USD || '--'}/month`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CostView;
