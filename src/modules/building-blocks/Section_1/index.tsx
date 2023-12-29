'use client';

import { Flex, Box, Text } from '@chakra-ui/react';

const Section1 = () => {
  return (
    <Flex w={'100%'}>
      <Text
        flex={1}
        fontSize={['28px', '48px']}
        fontWeight={400}
        lineHeight={'110%'}
        color={'#000'}
      >
        Building Blocks
      </Text>
      <Box w={['200px', null]} />
      <Text
        maxW={'650px'}
        fontSize={['14px', '22px']}
        fontWeight={400}
        lineHeight={'110%'}
        wordBreak={'break-word'}
        color={'#000'}
      >
        Lorem ipsum dolor sit amet consectetur. Gravida est vehicula fringilla
        ut pulvinar. Varius egestas aliquet blandit morbi integer dui. Blandit
        semper id aliquam vitae ut dui fusce risus.
      </Text>
    </Flex>
  );
};

export default Section1;
