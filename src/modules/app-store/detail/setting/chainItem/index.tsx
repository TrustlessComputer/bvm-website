import React, { useMemo } from 'react';
import { INFO_TOKENS } from '@/modules/PublicSale/depositModal/constants';
import { Avatar, Flex, MenuItem, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';

const ChainItem: React.FC<any> = ({
                                             chain,
                                             onSelectChain,
                                           }: {chain: OrderItem, onSelectChain: any}) => {
  if (!chain) {
    return <MenuItem>{'Select an token'}</MenuItem>;
  }

  return (
    <MenuItem className={s.itemToken} onClick={() => onSelectChain?.(chain)}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex>
          <Avatar width={'48px'} height={'48px'} src={chain?.logoURL} />
          <Flex direction={"column"}>
            <Text>{chain?.chainName}</Text>
            <Text>{chain?.chainName}</Text>
          </Flex>
        </Flex>
        <Text>dfafd</Text>
      </Flex>

    </MenuItem>
  );
};

export default ChainItem;
