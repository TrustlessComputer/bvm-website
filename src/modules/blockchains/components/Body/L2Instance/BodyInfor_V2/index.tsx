'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex } from '@chakra-ui/react';

import BlockchainSection from './BlockchainSection';
import HardwareSection from './HardwareSection';
// import WarningSection from './WarningSection';
import WarningSection from './WarningSection_V2';
import PackageSection from './PackageSection';

import s from '../styleFont.module.scss';
import { RollupEnum } from '@/modules/blockchains/Buy/Buy.constanst';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
};

const BodyInfor = (props: Props) => {
  const { item, isOwner } = props;
  return (
    <Flex
      flexDir={'column'}
      className={s.container}
      gap={['10px', '18px', '28px']}
    >
      <WarningSection item={item} />
      {item.serviceType === RollupEnum.Rollup_ZK && (
        <PackageSection item={item} />
      )}
      {item.serviceType === RollupEnum.Rollup_ZK && (
        <HardwareSection item={item} />
      )}
      <BlockchainSection item={item} />
    </Flex>
  );
};

export default BodyInfor;
