'use client';

import { Flex, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface IProps {
  title?: string
  url?: string
}

const NavigatioBar = ({ title, url }: IProps) => {
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
      onClick={() => {
        if (!!url) {
          return router.replace(url);
        }
        router.back()
      }}
    >
      <Image src={'/icons/back_orange_ic.svg'}></Image>
      <Text
        color={'#FA4E0E'}
        fontSize={['14px', '15px', '16px']}
        fontWeight={400}
      >
        {title || 'Chains'}
      </Text>
    </Flex>
  );
};

export default NavigatioBar;
