'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';
import useOrderMapper from '../../../hooks/useOrderMapper';
import s from './styles.module.scss';
import BodyInfor from '@/modules/blockchains/components/Body/L2Instance/BodyInfor_V2';
import BottomView from '@/modules/blockchains/components/Body_v2/L2Instance/Bottom';

type Props = {
  orderItem: OrderItem;
};

const ChainDetailLeftView = (props: Props) => {
  const { orderItem } = props;

  return (
    <>
      <BodyInfor item={orderItem} />
      <BottomView item={orderItem} />
    </>
  );
};

export default ChainDetailLeftView;
