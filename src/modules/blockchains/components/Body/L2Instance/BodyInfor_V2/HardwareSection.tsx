'use client';

import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import s from '../styleFont.module.scss';
import ColumnInfor from './ColumnInfor';

type Props = {
  item: OrderItem;
};

const HardwareSection = (props: Props) => {
  const { item } = props;
  const mapper = useOrderMapper(item);
  const { memory, cpuCore, storage } = item;

  return (
    <Flex
      bgColor={'#F6F6F6'}
      p="20px"
      gap={'12px'}
      borderRadius={'8px'}
      flexDir={'column'}
    >
      <Text
        fontSize={'20px'}
        lineHeight={'28px'}
        fontWeight={600}
        color={'#000'}
        className={s.fontSFProDisplay}
      >
        {'Hardware'}
      </Text>

      <SimpleGrid columns={[3]} spacing="20px" width={'100%'}>
        <ColumnInfor title="Memory" content={`${memory} GB RAM`} />
        <ColumnInfor title="CPU" content={`${cpuCore} cores`} />
        <ColumnInfor title="Storage" content={`${storage} GB SSD`} />
      </SimpleGrid>
    </Flex>
  );
};

export default HardwareSection;
