'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import PartyList from './PartyList';
import s from './styles.module.scss';

const PumpModule = () => {
  return (
    <Flex className={s.container}>
      <Flex className={s.content}>
        <PartyList />
      </Flex>
    </Flex>
  );
};

export default PumpModule;
