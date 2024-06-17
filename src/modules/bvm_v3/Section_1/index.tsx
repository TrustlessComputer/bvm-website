'use client';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss'

const Section_1 = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      bgColor={'#fff'}
      gap={{ base: '12px', md: '16px' }}
      alignItems={'center'}
    >
      <Text
        color={'#000'}
        className={s.heading}
      >
        BVM Utilities
      </Text>
      <Text
        className={s.description}
        textAlign={'center'}
        color={'#000'}
        maxW={'460px'}
      >
        BVM is the governance and utility token used within the BVM ecosystem to empower builders and users to build the future of Bitcoin.
      </Text>
    </Flex>
  );
};

export default Section_1;
