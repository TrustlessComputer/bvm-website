'use client';

import { Flex, Image, Text } from '@chakra-ui/react';
import { IDappItem } from './type';

export type Props = {
  item: IDappItem;
  onClick: () => void;
};

const DappInstalledItem = (props: Props) => {
  const { onClick } = props;
  const { iconUrl, name, isInstallNewDapps } = props.item;

  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      gap={['16px', '18px', '20px']}
      borderRadius={'8px'}
      p={['10px', '12px', '15px']}
      minH={['50px', '65px', '70px']}
      bgGradient={
        isInstallNewDapps
          ? `linear(to-b, #D8F3E0, #9EE0B1)`
          : `linear(to-b, #F6F6F6, #F6F6F6)`
      }
      _hover={{
        cursor: isInstallNewDapps ? 'pointer' : '',
        opacity: isInstallNewDapps ? 0.8 : 1,
      }}
      onClick={onClick}
    >
      <Image src={iconUrl || '--'} w="60px" h={'auto'} fit={'contain'}></Image>
      <Text
        fontSize={['14px', '15px', '16px']}
        fontWeight={500}
        color={isInstallNewDapps ? '#5CC773' : '#000'}
      >
        {name || '--'}
      </Text>
    </Flex>
  );
};

export default DappInstalledItem;
