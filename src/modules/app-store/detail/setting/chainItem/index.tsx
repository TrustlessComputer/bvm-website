import React from 'react';
import { Avatar, Flex, MenuItem, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';
import cx from 'clsx';

const ChainItem: React.FC<any> = ({ data, onSelectChain, isButton}: {data: OrderItem, onSelectChain: any, isButton: boolean}) => {
  if (!data) {
    return <MenuItem className={s.container}><Text className={s.titleSelect}>Choose the chain</Text></MenuItem>;
  }

  if(isButton) {
    return (
      <MenuItem className={s.container} w={"98%"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"100%"}>
          <Text className={s.titleSelect}>{data?.chainName} - Hacker</Text>
          <Text className={cx(s.package, data?.isNeedTopup ? s.needTopup : '')}>{data?.isNeedTopup ? 'Waiting for payment' : 'Basic'}</Text>
        </Flex>
      </MenuItem>
    );
  }

  console.log('chain', data);

  return (
    <MenuItem className={cx(s.container, s.item)} onClick={() => onSelectChain?.(data)}>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"100%"}>
        <Flex gap={"20px"} alignItems={"center"}>
          <Avatar width={'48px'} height={'48px'} src={data?.logoURL} />
          <Flex direction={"column"} gap={"8px"}>
            <Text className={s.title}>{data?.chainName}</Text>
            <Flex alignItems={"center"} gap={"12px"}>
              <Text className={s.chain_package}>Hacker</Text>
              <Text className={s.price}>${data?.packagePriceUSD} per rollup/month</Text>
            </Flex>
          </Flex>
        </Flex>
        <Text className={cx(s.package, data?.isNeedTopup ? s.needTopup : '')}>{data?.isNeedTopup ? 'Waiting for payment' : 'Basic'}</Text>
      </Flex>
    </MenuItem>
  );
};

export default ChainItem;
