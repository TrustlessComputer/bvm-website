import React from 'react';

import {
  ORDER_FIELD,
  useOrderFormStore,
} from '@/modules/blockchains/Buy/stores/index_v2';

import { OrderFormOptions } from '../../Buy.data';
import LegoV3 from '../LegoV3';
import { DALayerEnum } from '../../Buy.constanst';
import DropdownV2 from '../DropdownV2';

const RightDataAvailabilityLego = ({
  isLeft = false,
}: {
  isLeft?: boolean;
}) => {
  const {
    dataAvaibilityChain,
    setDataAvaibilityChain,
    isDataAvailabilityChainDragged,
  } = useOrderFormStore();

  const onDropdownChange = (value: DALayerEnum) => {
    setDataAvaibilityChain(value);
  };

  return (
    <LegoV3
      background={
        OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].background
      }
      label={
        isLeft
          ? ''
          : OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].subTitle
      }
      zIndex={6}
      active={isDataAvailabilityChainDragged}
    >
      <DropdownV2
        cb={onDropdownChange}
        defaultValue={dataAvaibilityChain}
        field={ORDER_FIELD.DATA_AVAILABILITY_CHAIN}
        options={OrderFormOptions[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].options}
        checkDisable
      />
    </LegoV3>
  );
};

export default RightDataAvailabilityLego;
