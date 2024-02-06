import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import React from 'react';

const TopContent = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <Flex direction={'column'} gap={3}>
          <Text fontSize={"16px"} fontWeight={400} lineHeight={'24px'} className={s.subTitle}>
            Bitcoin Virtual Machine
          </Text>
          <Text className={s.title}>Bitcoin, reimagined.</Text>
          <Text fontSize={16} fontWeight={400} lineHeight={'24px'} className={s.desc}>BVM is the first modular Bitcoin L2 metaprotocol on Bitcoin. With a few clicks, anyone can plug and play the best-of-breed blockchain modules to launch their own Bitcoin L2 blockchain
          </Text>
        </Flex>
      </div>
    </div>
  );
};

export default TopContent;
