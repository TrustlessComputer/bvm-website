'use client';

import { IDAppInstalled } from '@/stores/states/l2services/types';
import { Flex, Image, Text } from '@chakra-ui/react';

export type Props = {
  item: IDAppInstalled;
  onClick: () => void;
};

const DappInstalledItem = (props: Props) => {
  const { onClick } = props;
  const { appImageURL, appName } = props.item;

  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      gap={['16px', '18px', '20px']}
      borderRadius={'8px'}
      p={['10px', '12px', '15px']}
      minH={['50px', '65px', '70px']}
      bgGradient={`linear(to-b, #F6F6F6, #F6F6F6)`}
      _hover={{
        cursor: 'pointer',
        opacity: 0.8,
      }}
      onClick={onClick}
    >
      <Image
        src={appImageURL || '/icons/add_dapp_default.svg'}
        w="60px"
        h={'auto'}
        fit={'contain'}
      ></Image>
      <Text fontSize={['14px', '15px', '16px']} fontWeight={500} color={'#000'}>
        {appName || '--'}
      </Text>
    </Flex>
  );
};

export default DappInstalledItem;
