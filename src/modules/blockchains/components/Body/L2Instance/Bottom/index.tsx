'use client';

import {
  IDAppInstalled,
  OrderItem,
  OrderStatus,
} from '@/stores/states/l2services/types';
import addChain from '@/utils/addChain';
import { Flex, Image, Text, Button, SimpleGrid } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import DappInstalledItem from './DappInstalledItem';
import { useRouter } from 'next/navigation';
import InstallNewDAppItem from './InstallNewDAppItem';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
  viewBillingOnClick?: () => void;
  bridgeOnClick?: () => void;
  editConfigBridgeOnClick?: () => void;
  cancelOrderOnClick?: () => void;
};

const BottomView = (props: Props) => {
  const { item, isOwner, bridgeOnClick, editConfigBridgeOnClick } = props;
  const router = useRouter();
  const { dApps } = item;

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

  const renderAddToMetamask = () => {
    if (!isAddToMetamask) return null;
    return (
      <Button
        mt={'15px'}
        borderRadius={'15px'}
        minH={['40px', '45px', '50px']}
        fontSize={['15px', '16px', '18px']}
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
    );
  };

  const dappList = useMemo(() => {
    return dApps?.filter((item) => item.status === 'done') || [];
  }, [dApps]);

  return (
    <Flex flexDir={'column'} gap={'20px'} mt="20px">
      <Flex flexDir={'row'} align={'center'} justify={'space-between'}>
        <Text
          fontSize={['14px', '15px', '16px']}
          fontWeight={400}
          opacity={0.7}
          color={'#000'}
        >
          Installed Dapps
        </Text>
        {renderAddToMetamask()}
      </Flex>

      <SimpleGrid columns={[1, 1, 3]} spacing={'16px'}>
        <InstallNewDAppItem
          onClick={() => {
            router.push('/app-store');
          }}
        />
        {dappList.map((item, index) => {
          return (
            <DappInstalledItem
              key={`${index}-${item.appName || item.appID}`}
              item={item}
              onClick={() => {
                window.open(`${item.appURL}`, '_blank');
              }}
            />
          );
        })}
      </SimpleGrid>
    </Flex>
  );
};

export default BottomView;
