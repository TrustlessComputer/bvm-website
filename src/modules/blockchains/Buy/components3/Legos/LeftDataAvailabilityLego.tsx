import React from 'react';

import {
  ORDER_FIELD,
  useOrderFormStore,
} from '@/modules/blockchains/Buy/stores/index_v2';

import { OrderFormOptions } from '../../Buy.data';
import LegoV3 from '../LegoV3';
import { NetworkEnum } from '../../Buy.constanst';
import Draggable from '../Draggable';

const LeftDataAvailabilityLego = () => {
  const { network } = useOrderFormStore();

  return (
    OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].options || []
  ).map((option) => (
    <Draggable
      key={option.value}
      id={ORDER_FIELD.DATA_AVAILABILITY_CHAIN + '-' + option.value.toString()}
      value={option.value}
    >
      <LegoV3
        background={
          OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].background
        }
        zIndex={6}
        active={network === option.value}
        label={option.label}
        icon={option.icon}
      />
    </Draggable>
  ));
};

export default LeftDataAvailabilityLego;
