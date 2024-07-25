'use client';

import { Flex, Text, Image } from '@chakra-ui/react';
import s from './styles.module.scss';

const RightHeaderView = () => {
  return (
    <Flex
      w="100%"
      flexDir={'row'}
      align={'center'}
      px={['12px']}
      py={'8px'}
      className={s.container}
    >
      <Text
        fontSize={['14px']}
        fontWeight={500}
        color={'#555555'}
        textAlign={'left'}
      >
        Modules
      </Text>

      {/* <Flex flexDir={'row'} align={'center'} gap={'2px'}>
        <Text fontSize={['14px']} fontWeight={500} color={'#555555'}>
          Status
        </Text>
        <Image src="/icons/lamp_ic.svg" h="16px" w={'16px'} fit={'contain'} />
      </Flex> */}
    </Flex>
  );
};

export default RightHeaderView;
