'use client';

import { Flex, Image, Text } from '@chakra-ui/react';

export type Props = {
  onClick: () => void;
};

const InstallNewDAppItem = (props: Props) => {
  const { onClick } = props;
  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      gap={['16px', '18px', '20px']}
      borderRadius={'8px'}
      p={['10px', '12px', '15px']}
      minH={['50px', '65px', '70px']}
      bgGradient={`linear(to-b, #D8F3E0, #9EE0B1)`}
      _hover={{
        cursor: 'pointer',
        opacity: 0.8,
      }}
      onClick={onClick}
    >
      <Image
        src={`/icons/add_dapp_ic.svg`}
        w="60px"
        h={'auto'}
        fit={'contain'}
      />
      <Text
        fontSize={['14px', '15px', '16px']}
        fontWeight={500}
        color={'#5CC773'}
      >
        {'Install new apps'}
      </Text>
    </Flex>
  );
};

export default InstallNewDAppItem;
