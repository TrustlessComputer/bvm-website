'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text, Divider } from '@chakra-ui/react';
import useOrderMapper from '../../hooks/useOrderMapper';
import s from './styles.module.scss';

import Header from './Header';
import Body from './Body/ChainDetail.Body';
import { useEffect } from 'react';
import { useAppDispatch } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';

type Props = {
  orderItem: OrderItem;
};

const ChainDetail = (props: Props) => {
  const { orderItem } = props;

  const dispatch = useAppDispatch();
  const mapper = useOrderMapper(orderItem);

  useEffect(() => {
    dispatch(setOrderSelected(orderItem));
  }, [dispatch]);

  return (
    <Flex flexDir={'column'} w="100%" gap="40px" bgColor={'#fff'}>
      <Header orderItem={orderItem} />
      <Divider h="1px" bgColor={'#ECECEC'} />
      <Body orderItem={orderItem} />
    </Flex>
  );
};

export default ChainDetail;
