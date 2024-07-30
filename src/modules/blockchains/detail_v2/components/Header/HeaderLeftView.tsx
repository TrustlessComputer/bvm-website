'use client';

import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import { Flex, Image, Text } from '@chakra-ui/react';
import useOrderMapper from '../../../hooks/useOrderMapper';
// import HeaderRow from '@/modules/blockchains/components/Body/L2Instance/HeaderRow';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import LivingStatus from '@/modules/blockchains/components/Body/L2Instance/LivingStatus';
import { useRouter } from 'next/navigation';
import MenuEdit, { MenuEditItemEnum, MenuEditItemType } from '../MenuEdit';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { closeModal, openModal } from '@/stores/states/modal/reducer';
import UpdateOrderModal from '@/modules/blockchains/components/UpdateOrderModal_v2';
import useL2Service from '@/hooks/useL2Service';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useEffect } from 'react';

type Props = {
  orderItem: OrderItem;
};

const HeaderLeftView = (props: Props) => {
  const { orderItem: item } = props;

  const { getAccountInfor } = useL2Service();
  const { loggedIn, login } = useWeb3Auth();
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);

  useEffect(() => {
    if (loggedIn) {
      getAccountInfor();
    }
  }, [loggedIn]);

  const isOwner =
    item?.tcAddress?.toLowerCase() ===
    accountInforL2Service?.tcAddress?.toLowerCase();

  const router = useRouter();
  const mapper = useOrderMapper(item);
  const dispatch = useAppDispatch();
  const { tracking } = useL2ServiceTracking();

  const menuEditItemOnClick = (menuItem: MenuEditItemType) => {
    switch (menuItem.value) {
      case MenuEditItemEnum.UpdateYourChainInfor:
        {
          // TO DO
          // Show Modal update your chain infor
          const id = 'SETTING_MODAL';
          dispatch(
            openModal({
              id: id,
              modalProps: {
                size: 'xl',
              },
              render: () => (
                <UpdateOrderModal
                  show={true}
                  item={item}
                  onClose={() => {
                    dispatch(closeModal({ id: id }));
                  }}
                  onSuccess={() => {}}
                  cancelThisRollupOnClick={() => {}}
                />
              ),
            }),
          );
        }
        break;
      case MenuEditItemEnum.ConfigYourDAppsDomain:
        {
          // TODO [@Sang sensei]
          router.push(`/domain/${item.chainId}`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Flex flexDir={'row'} align={'center'} justifyItems={'center'} gap={'30px'}>
      {item.logoURL ? (
        <Image
          src={`${item.logoURL}`}
          w={['60px', '80px', '120px']}
          borderRadius={'4px'}
          h={'auto'}
          objectFit={'contain'}
        />
      ) : (
        <Image
          src={'/blockchains/customize/ic-infa.svg'}
          w={['60px', '80px', '120px']}
          h={'auto'}
          objectFit={'contain'}
        />
      )}

      <Flex
        flexDir={'column'}
        align={'flex-start'}
        justifyItems={'center'}
        gap={'10px'}
      >
        <Flex flexDir={'row'} align={'center'} gap={'10px'}>
          <Text
            fontSize={['20px', '22px', '25px']}
            fontWeight={500}
            color={'#000'}
          >
            {`${item.chainName || '--'}`}
          </Text>

          {isOwner && item.status === OrderStatus.Started && (
            <MenuEdit itemOnClick={menuEditItemOnClick} />
          )}
        </Flex>

        <Flex flexDir={'row'} align={'center'} gap={'10px'}>
          <LivingStatus color={mapper.color || 'transparent'} />
          <Text
            fontSize={['16px', '18px', '20px']}
            fontWeight={500}
            color={mapper.color || 'transparent'}
          >
            {mapper.status || ''}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeaderLeftView;
