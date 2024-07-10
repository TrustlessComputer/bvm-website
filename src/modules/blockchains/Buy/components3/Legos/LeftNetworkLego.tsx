import React from 'react';

import {
  ORDER_FIELD,
  useOrderFormStore,
} from '@/modules/blockchains/Buy/stores/index_v2';

import { OrderFormOptions } from '../../Buy.data';
import LegoV3 from '../LegoV3';
import { NetworkEnum } from '../../Buy.constanst';
import Draggable from '../Draggable';

const LeftNetworkLego = () => {
  const { network, isNetworkDragged } = useOrderFormStore();

  return (OrderFormOptions[ORDER_FIELD.NETWORK].options || []).map((option) => {
    if (network === option.value && isNetworkDragged) return null;

    return (
      <Draggable
        key={option.value}
        id={ORDER_FIELD.NETWORK + '-' + option.value.toString()}
        value={option.value}
      >
        <LegoV3
          background={OrderFormOptions[ORDER_FIELD.NETWORK].background}
          zIndex={12}
          active={network === option.value}
          label={option.label}
          icon={option.icon}
        />
      </Draggable>
    );
  });
};

export default LeftNetworkLego;
