'use client';

import s from './styles.module.scss';
import { Flex } from '@chakra-ui/react';
import BridgeForm from '@/modules/Bridge/components/BridgeForm';

const BridgeModule = () => {
  return (
    <Flex className={s.container}>
      <BridgeForm />
    </Flex>
  );
};

export default BridgeModule;
