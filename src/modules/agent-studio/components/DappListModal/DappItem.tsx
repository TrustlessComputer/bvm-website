'use client';

import { Flex, Image, Text, Button } from '@chakra-ui/react';

export type Props = {
  item: any;
  onClick: () => void;
  instalOnClick: () => void;
};

const DappItem = (props: Props) => {
  const { onClick, instalOnClick } = props;
  const { name, iconUrl, desc, isHide, canInstall } = props.item;

  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      gap={['16px', '18px', '20px']}
      borderRadius={'8px'}
      p={['14px', '16px', '20px']}
      minH={['50px', '65px', '70px']}
      bgColor={'#F6F6F6'}
    >
      <Image
        src={iconUrl || '--'}
        w={['40px', '50px', '60px']}
        h={'auto'}
        fit={'contain'}
      ></Image>

      <Flex
        flex={1}
        flexDir={'column'}
        gap={['4px', '5px', '8px']}
        align={'flex-start'}
        justify={'center'}
        alignSelf={'stretch'}
      >
        <Text
          fontSize={['16px', '18px', '24px']}
          fontWeight={500}
          color={'#000'}
        >
          {name}
        </Text>
        <Text
          fontSize={['13px', '14px', '16px']}
          fontWeight={400}
          color={'#000'}
          opacity={0.7}
        >
          {desc}
        </Text>
      </Flex>

      <Button
        bgColor={'#FA4E0E'}
        color={'#fff'}
        borderRadius={'100px'}
        h={'auto'}
        minW={['80px', '120px', '160px', '200px']}
        maxH={['35px', '40px', '45px']}
        fontSize={['13px', '14px', '15px']}
        p="20px"
        fontWeight={600}
        onClick={instalOnClick}
        _hover={{
          cursor: 'pointer',
          opacity: 0.8,
        }}
      >
        Install
      </Button>
    </Flex>
  );
};

export default DappItem;
