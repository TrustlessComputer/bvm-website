'use client';

import { RollupEnumMap } from '@/modules/blockchains/Buy/Buy.constanst';
import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { OrderItem } from '@/stores/states/l2services/types';
import { formatUnixDateTime } from '@/utils/time';
import { Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';

type Props = {
  item: OrderItem;
};

const PackageView = (props: Props) => {
  const { item } = props;
  const mapper = useOrderMapper(item);

  return (
    <Flex
      bgColor={'#F6F6F6'}
      p="20px"
      align={'center'}
      justify={'space-between'}
    ></Flex>
  );
};

export default PackageView;
