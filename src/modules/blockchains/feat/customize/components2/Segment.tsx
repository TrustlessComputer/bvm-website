import { Flex, HStack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import { PluginTypeEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';

export type Props = {
  item: ItemDetail;
  indexSelected: number;
  disabled?: boolean;
  isMainnet: boolean;
  pluinType?: number;
  onClick?: (item: ItemDetail, value: number) => void;
};

const Segment = React.memo((props: Props) => {
  const { item, disabled, indexSelected, isMainnet, pluinType, onClick } =
    props;

  if (pluinType === PluginTypeEnum.PluginType_Bridge) return null;

  return (
    <HStack
      minH={'80px'}
      flexDir={'row'}
      p={'10px'}
      divider={<StackDivider borderColor="gray.200" />}
      borderWidth={'1.5px'}
      borderColor={'gray.200'}
      color={'#00000056'}
    >
      <Flex
        flex={1}
        onClick={() => {
          onClick && onClick(item, -1);
        }}
        align={'center'}
        justify={'center'}
      >
        <Text>{'No, thanks'}</Text>
      </Flex>
      <Flex
        flex={1}
        onClick={() => {
          onClick && onClick(item, item.value);
        }}
        align={'center'}
        justify={'center'}
      >
        <Text fontSize={'16px'}>{`${item.valueStr}`}</Text>
        <Text fontSize={'16px'}>{`${
          isMainnet ? item.price : item.price
        }`}</Text>
      </Flex>
    </HStack>
  );
});

export default Segment;
