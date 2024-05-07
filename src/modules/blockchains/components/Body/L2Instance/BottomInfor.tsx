'use client';

import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import addChain from '@/utils/addChain';
import { Flex, Image, Text, Button } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
};

const BottomInfor = (props: Props) => {
  const { item, isOwner } = props;

  const [adding, setAdding] = useState(false);

  const isAddToMetamask = useMemo(() => {
    return (
      (item.status === OrderStatus.Started ||
        item.status === OrderStatus.Resume) &&
      item.chainName &&
      item.explorer &&
      item.rpc &&
      item.chainId
    );
  }, [item]);

  const onAddChain = async () => {
    setAdding(true);
    try {
      await addChain({
        name: item.chainName,
        chainId: Number(item.chainId),
        nativeCurrency: {
          name: item.chainName,
          symbol: item.ticker || 'BVM',
          decimals: 18,
        },
        explorers: [
          {
            name: `${item.chainName} explorer`,
            url: item.explorer,
            standard: 'EIP3091',
          },
        ],
        rpc: [item.rpc || 'https://rpc.nos.dev'],
      } as any);
    } catch (e) {
      // todo handle error
      console.log(' onAddChain ERROR: ', e);
    } finally {
      setAdding(false);
    }
  };

  const renderDAppItem = (icURL: string, dAppName: string) => {
    return (
      <Flex
        flexDir={'row'}
        gap={'10px'}
        align={'center'}
        p="10px"
        bgColor={'#d7d5d54b'}
        maxW={'max-content'}
        borderRadius={'6px'}
      >
        <Image src={icURL} w={'40px'} h={'auto'} objectFit={'contain'} />
        <Text fontSize={'16px'} fontWeight={500} color={'#000'}>
          {dAppName || '--'}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex flexDir={'column'} gap={'20px'}>
      <Text fontSize={'16px'} fontWeight={500} color={'#6d6d6d'}>
        Pre-Installed Dapps
      </Text>
      <Flex
        flexDir={'row'}
        gap={'10px'}
        align={'center'}
        justify={'space-between'}
      >
        {renderDAppItem(
          '/blockchains/customize/ic-bridge.svg',
          'Trustless Bridge',
        )}
        {isAddToMetamask && (
          <Button
            borderRadius={'15px'}
            minH={'60px'}
            color={'#17066c'}
            bgColor={'#fff'}
            borderWidth={'1px'}
            borderColor={'#17066c'}
            onClick={(event) => {
              if (event.stopPropagation) event.stopPropagation();
              onAddChain();
            }}
          >
            Add to Metamask
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default BottomInfor;
