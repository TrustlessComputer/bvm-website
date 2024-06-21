'use client';

import { RollupEnumMap } from '@/modules/blockchains/Buy/Buy.constanst';
import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { OrderItem } from '@/stores/states/l2services/types';
import { formatUnixDateTime } from '@/utils/time';
import { Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';

import PackageSection from './PackageSection';
import HardwareSection from './HardwareSection';
import BlockchainSection from './BlockchainSection';

import s from '../styleFont.module.scss';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
};

const BodyInfor = (props: Props) => {
  const { item, isOwner } = props;
  return (
    <Flex flexDir={'column'} className={s.container} gap={'28px'}>
      <PackageSection item={item} />
      <HardwareSection item={item} />
      <BlockchainSection item={item} />
    </Flex>
  );
};

export default BodyInfor;
