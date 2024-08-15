import LivingStatus from '@/modules/blockchains/components/Body_v2/L2Instance/LivingStatus';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { Flex, Image, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { OrderStatus } from '@/stores/states/l2services/types';
import MenuEdit, {
  MenuEditItemEnum,
  MenuEditItemType,
} from '@/modules/blockchains/detail_v2/components/MenuEdit';

const ChainInforView = (): ReactElement => {
  const { order } = useChainProvider();
  const router = useRouter();
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);

  const isOwner =
    order?.tcAddress?.toLowerCase() ===
    accountInforL2Service?.tcAddress?.toLowerCase();

  const menuEditItemOnClick = (menuItem: MenuEditItemType) => {
    switch (menuItem.value) {
      case MenuEditItemEnum.ABC:
        {
          //TO DO ABC
        }
        break;
      case MenuEditItemEnum.ConfigYourDAppsDomain:
        router.push(`/domain/${order?.chainId}`);
        break;
      default:
        break;
    }
  };

  // const mapper = useOrderMapper(order);
  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      justifyItems={'center'}
      gap={'20px'}
      mt={'5px'}
    >
      <Image
        src={`${order?.logoURL || '/blockchains/customize/ic-infa.svg'}`}
        w={['30px', '35px', '40px']}
        borderRadius={'100%'}
        h={'auto'}
        objectFit={'contain'}
      />

      <Text fontSize={['22px', '24px', '28px']} fontWeight={600} color={'#000'}>
        {`${order?.chainName || '--'}`}
      </Text>

      {/* {isOwner && order?.status === OrderStatus.Started && (
        <MenuEdit itemOnClick={menuEditItemOnClick} />
      )} */}
      {/* <MenuEdit itemOnClick={menuEditItemOnClick} /> */}

      {/* <Image
        src={`/icons/pencil_edit_grey.svg`}
        fit={'contain'}
        maxW={'24px'}
        maxH={'24px'}
        _hover={{
          cursor: 'pointer',
          opacity: 0.8,
        }}
        onClick={(event: any) => {
          if (event.stopPropagation) event.stopPropagation();
          router.push(`/domain/${order?.chainId}`);
        }}
      /> */}

      {/* <LivingStatus color={mapper.color || '#0ec00e'} /> */}
    </Flex>
  );
};

export default React.memo(ChainInforView);
