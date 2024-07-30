'use client';

import CustomViewModule from '@/modules/customViewModule_v0';
import { OrderItem } from '@/stores/states/l2services/types';

type Props = {
  orderItem: OrderItem;
};

const ChainDetailRightView = (props: Props) => {
  const { orderItem } = props;
  return (
    <CustomViewModule
      orderItem={orderItem}
      selectedOptions={orderItem.selectedOptions || []}
    ></CustomViewModule>
  );
};

export default ChainDetailRightView;
