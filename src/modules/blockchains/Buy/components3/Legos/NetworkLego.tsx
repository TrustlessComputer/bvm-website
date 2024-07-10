import React from 'react';

import {
  ORDER_FIELD,
  useOrderFormStore,
} from '@/modules/blockchains/Buy/stores/index_v2';

import { OrderFormOptions } from '../../Buy.data';
import LegoV3 from '../LegoV3';
import { NetworkEnum } from '../../Buy.constanst';
import DropdownV2 from '../DropdownV2';

const NetworkLego = ({ isLeft = false }: { isLeft?: boolean }) => {
  const { network, setNetwork, isNetworkDragged } = useOrderFormStore();

  const onDropdownChange = (value: NetworkEnum) => {
    setNetwork(value);
  };

  return (
    <LegoV3
      background={'pink'}
      label={isLeft ? '' : OrderFormOptions[ORDER_FIELD.NETWORK].subTitle}
      zIndex={6}
      active={isNetworkDragged}
    >
      <DropdownV2
        cb={onDropdownChange}
        defaultValue={network}
        field={ORDER_FIELD.NETWORK}
        options={OrderFormOptions[ORDER_FIELD.NETWORK].options}
      />
    </LegoV3>
  );
};

export default NetworkLego;
