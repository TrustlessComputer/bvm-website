import React, { useRef } from 'react';

import {
  ORDER_FIELD,
  useOrderFormStore,
} from '@/modules/blockchains/Buy/stores/index_v2';
import s from './styles.module.scss';
import { OrderFormOptions } from '../../Buy.data';
import LegoV3 from '../LegoV3';
import { NetworkEnum } from '../../Buy.constanst';
import Draggable from '../Draggable';
import { Tooltip, TooltipRefProps } from 'react-tooltip';
import styles from '@/modules/blockchains/Buy/components3/LegoV3/styles.module.scss';

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
      <React.Fragment>

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
              zIndex={24}
              active={network === option.value}
              label={option.label}
              icon={option.icon}
              className={isDisabled ? s.disabled : ''}
            />
        </Draggable>


      </React.Fragment>

    );
  });
};

export default React.memo(LeftDataAvailabilityLego);
