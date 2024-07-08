import React from 'react';
import { Avatar, Flex, MenuItem, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';
import cx from 'clsx';

const ChainItem: React.FC<any> = ({ chain, onSelectChain, }: {chain: OrderItem, onSelectChain: any}) => {
  if (!chain) {
    return <MenuItem className={s.container}><Text className={s.titleSelect}>Choose the chain</Text></MenuItem>;
  }

  console.log('chain', chain);

  return (
    <MenuItem className={cx(s.container, s.item)} onClick={() => onSelectChain?.(chain)}>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"100%"}>
        <Flex gap={"20px"}>
          <Avatar width={'48px'} height={'48px'} src={chain?.logoURL} />
          <Flex direction={"column"} gap={"8px"}>
            <Text className={s.title}>{chain?.chainName}</Text>
            <Flex alignItems={"center"} gap={"12px"}>
              <Text className={s.chain_package}>Hacker</Text>
              <Text className={s.price}>${chain?.packagePriceUSD} per rollup/month</Text>
            </Flex>
          </Flex>
        </Flex>
        <Text className={cx(s.package, chain?.isNeedTopup ? s.needTopup : '')}>{chain?.isNeedTopup ? 'Waiting for payment' : 'Basic'}</Text>
      </Flex>
    </MenuItem>
  );
};

export default ChainItem;
