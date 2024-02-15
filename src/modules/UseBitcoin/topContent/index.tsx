import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import React from 'react';

const TopContent = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <Flex direction={'column'} gap={3}>
          <Text fontSize={"16px"} fontWeight={400} lineHeight={'24px'} className={s.subTitle}>
            Welcome to the future of Bitcoin
          </Text>
          <Text className={s.title}>Experience Bitcoin like never before.</Text>
          <Text fontSize={16} fontWeight={400} lineHeight={'24px'} className={s.desc}>Hop from one Bitcoin L2 to another to play on-chain games, trade BRC-20 futures, run for charity, learn about modular architecture, and more.
          </Text>
        </Flex>
      </div>
    </div>
  );
};

export default TopContent;
