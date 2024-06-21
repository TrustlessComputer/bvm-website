'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex } from '@chakra-ui/react';

import BlockchainSection from './BlockchainSection';
import HardwareSection from './HardwareSection';
import WarningSection from './WarningSection';
import PackageSection from './PackageSection';

import s from '../styleFont.module.scss';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
};

const BodyInfor = (props: Props) => {
  const { item, isOwner } = props;
  return (
    <Flex flexDir={'column'} className={s.container} gap={'28px'}>
      <WarningSection item={item} />
      <PackageSection item={item} />
      <HardwareSection item={item} />
      <BlockchainSection item={item} />
    </Flex>
  );
};

export default BodyInfor;
