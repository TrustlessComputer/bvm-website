import React from 'react';

import {
  ORDER_FIELD,
  useOrderFormStore,
} from '@/modules/blockchains/Buy/stores/index_v2';
import s from './styles.module.scss';
import { OrderFormOptions } from '../../Buy.data';
import LegoV3 from '../LegoV3';
import { NetworkEnum } from '../../Buy.constanst';
import Draggable from '../Draggable';

const LeftDataAvailabilityLego = () => {
  const { network, dataAvaibilityChain, isDataAvailabilityChainDragged } =
    useOrderFormStore();

  return (
    OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].options || []
  ).map((option) => {
    const isDisabled = !option.avalaibleNetworks?.includes(network);

    if (dataAvaibilityChain === option.value && isDataAvailabilityChainDragged)
      return null;

    return (
      <Draggable
        key={option.value}
        id={ORDER_FIELD.DATA_AVAILABILITY_CHAIN + '-' + option.value.toString()}
        value={option.value}
        disabled={isDisabled}
      >
        <LegoV3
          background={
            OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].background
          }
          zIndex={6}
          active={network === option.value}
          label={option.label}
          icon={option.icon}
          className={isDisabled ? s.disabled : ''}
        />
      </Draggable>
    );
  });
};

export default LeftDataAvailabilityLego;
