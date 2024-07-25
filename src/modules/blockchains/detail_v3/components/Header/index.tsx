'use client';

import { Flex, Text, Image } from '@chakra-ui/react';
import s from './styles.module.scss';

const Header = () => {
  return (
    <Flex
      flexDir={'column'}
      className={s.container}
      justify={'center'}
      align={'center'}
      gap={'20px'}
    >
      {/* <Image
        src={'/bvmstudio_logo.png'}
        alt={'bvmstudio_logo'}
        margin={'auto'}
        maxWidth={'270px'}
      /> */}
      <Text
        className={s.text}
        marginX={'20px'}
        fontSize={['20px']}
        fontWeight={600}
        opacity={0.7}
      >
        Drag and drop modules to start new blockchains, new dapps, and new
        economies.
      </Text>
    </Flex>
  );
};

export default Header;
