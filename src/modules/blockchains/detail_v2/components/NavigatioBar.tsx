'use client';

import { Flex, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const NavigatioBar = () => {
  const router = useRouter();

  return (
    <Flex
      gap="10px"
      align="center"
      _hover={{
        cursor: 'pointer',
        opacity: 0.8,
      }}
      w="100%"
      onClick={() => router.back()}
    >
      <Image src={'/icons/back_orange_ic.svg'}></Image>
      <Text
        color={'#FA4E0E'}
        fontSize={['14px', '15px', '16px']}
        fontWeight={400}
      >
        Your Chains
      </Text>
    </Flex>
  );
};

export default NavigatioBar;
