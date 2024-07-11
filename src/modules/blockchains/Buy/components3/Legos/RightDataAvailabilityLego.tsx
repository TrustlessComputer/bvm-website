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

  const onDropdownChange = (value: DALayerEnum | number) => {
    setDataAvaibilityChain(value);
  };

  return (
    <LegoV3
      background={OrderFormOptions.dataAvaibilityChain.background}
      label={isLeft ? '' : OrderFormOptions.dataAvaibilityChain.subTitle}
      zIndex={10}
      active={isDataAvailabilityChainDragged}
    >
      <DropdownV2
        title={OrderFormOptions.dataAvaibilityChain.subTitle}
        cb={onDropdownChange as any}
        defaultValue={dataAvaibilityChain}
        field={ORDER_FIELD.DATA_AVAILABILITY_CHAIN}
        options={OrderFormOptions.dataAvaibilityChain.options}
        checkDisable
      />
    </LegoV3>
  );
};

export default React.memo(RightDataAvailabilityLego);
