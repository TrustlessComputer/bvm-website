'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, SimpleGrid, Text, Button } from '@chakra-ui/react';
import useOrderMapper from '../../../hooks/useOrderMapper';
import s from './styles.module.scss';
import HeaderRow from '@/modules/blockchains/components/Body/L2Instance/HeaderRow';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useEffect, useMemo } from 'react';
import useL2Service from '@/hooks/useL2Service';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useRouter } from 'next/navigation';

type Props = {
  orderItem: OrderItem;
};

const HeaderRightView = (props: Props) => {
  const { orderItem } = props;

  const router = useRouter();
  const { getAccountInfor } = useL2Service();
  const { loggedIn, login } = useWeb3Auth();
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);

  useEffect(() => {
    if (loggedIn) {
      getAccountInfor();
    }
  }, [loggedIn]);

  const isOwner =
    orderItem?.tcAddress?.toLowerCase() ===
    accountInforL2Service?.tcAddress?.toLowerCase();

  const titleBtn = useMemo(() => {
    if (!loggedIn) return 'Connect';
    if (isOwner) {
      return 'Setup';
    }
    return '';
  }, [orderItem, isOwner, loggedIn]);

  const onClickHandler = () => {
    if (!loggedIn) {
      login();
    } else {
      if (isOwner) {
        //Navigate to CustomizeV2 page
        router.push('/rollup/customizev2');
      } else {
        // TO DO
      }
    }
  };

  if (!loggedIn)
    return (
      <Button
        bgColor="#FA4E0E"
        h="50px"
        minW={'300px'}
        px={['40px']}
        py={['10px']}
        borderRadius={'24px'}
        _hover={{
          cursor: 'pointer',
          opacity: 0.7,
        }}
        onClick={onClickHandler}
      >
        {`${titleBtn || '--'}`}
      </Button>
    );

  if (!isOwner) return null;

  return (
    <Button
      bgColor="#FA4E0E"
      h="50px"
      minW={'300px'}
      px={['40px']}
      py={['10px']}
      borderRadius={'24px'}
      _hover={{
        cursor: 'pointer',
        opacity: 0.7,
      }}
      onClick={onClickHandler}
    >
      {`${titleBtn || '--'}`}
    </Button>
  );
};

export default HeaderRightView;
