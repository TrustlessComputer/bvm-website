'use client';

import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import addChain from '@/utils/addChain';
import { Flex, Image, Text, Button } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
  viewBillingOnClick?: () => void;
  bridgeOnClick?: () => void;
  editConfigBridgeOnClick?: () => void;
  cancelOrderOnClick?: () => void;
};

const BottomInfor = (props: Props) => {
  const {
    item,
    isOwner,
    viewBillingOnClick,
    cancelOrderOnClick,
    bridgeOnClick,
    editConfigBridgeOnClick,
  } = props;
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
        pos={'relative'}
        gap={'10px'}
        align={'center'}
        p="10px"
        bgColor={'#d7d5d54b'}
        maxW={'max-content'}
        borderRadius={'6px'}
        onClick={(event: any) => {
          if (event.stopPropagation) event.stopPropagation();
          bridgeOnClick && bridgeOnClick();
        }}
      >
        <Image src={icURL} w={'40px'} h={'auto'} objectFit={'contain'} />
        <Text fontSize={'16px'} fontWeight={500} color={'#000'}>
          {dAppName || '--'}
        </Text>
        {isOwner && (
          <Flex
            p={'5px'}
            onClick={(event: any) => {
              if (event.stopPropagation) event.stopPropagation();
              editConfigBridgeOnClick && editConfigBridgeOnClick();
            }}
          >
            <EditIcon
              color={'#484848'}
              position={'absolute'}
              top={'-8px'}
              right={'-8px'}
              w={'20px'}
              height={'auto'}
            />
          </Flex>
        )}
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

        <Flex flexDir={'row'} gap={'10px'}>
          {isOwner && item.status === OrderStatus.WaitingPayment && (
            // <Button
            //   borderRadius={'15px'}
            //   minH={'50px'}
            //   color={'#17066c'}
            //   bgColor={'#fff'}
            //   borderWidth={'1px'}
            //   borderColor={'#17066c'}
            //   _hover={{
            //     cursor: 'pointer',
            //     opacity: 0.6,
            //   }}
            //   onClick={(event) => {
            //     if (event.stopPropagation) event.stopPropagation();
            //     viewBillingOnClick && viewBillingOnClick();
            //   }}
            // >
            //   View Billing

            <Button
              borderRadius={'15px'}
              minH={'50px'}
              minW={'120px'}
              color={'#17066c'}
              bgColor={'#fff'}
              borderWidth={'1px'}
              borderColor={'#17066c'}
              _hover={{
                cursor: 'pointer',
                opacity: 0.6,
              }}
              onClick={(event) => {
                if (event.stopPropagation) event.stopPropagation();
                cancelOrderOnClick && cancelOrderOnClick();
              }}
            >
              Cancel
            </Button>
          )}
          {isAddToMetamask && (
            <Button
              borderRadius={'15px'}
              minH={'50px'}
              color={'#17066c'}
              bgColor={'#fff'}
              borderWidth={'1px'}
              borderColor={'#17066c'}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
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
    </Flex>
  );
};

export default BottomInfor;
