import React from 'react';

import {
  ORDER_FIELD,
  useOrderFormStore,
} from '@/modules/blockchains/Buy/stores/index_v2';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';

import { OrderFormOptions } from '../../Buy.data';
import LegoV3 from '../LegoV3';
import Slider from '../Slider/index_v2';
import CannotModifiedNoti from './CannotModifiedNoti';

type PricingPackageValues = {
  maxGasLimit: number;
  minGasLimit: number;
  defaultGasLimit?: number;
  stepGasLimit: number;
  defaultWithdrawalPeriod?: number;
  minWithdrawalPeriod: number;
  maxWithdrawalPeriod: number;
};

const BlockGasLimitLego = ({ isLeft = false }: { isLeft?: boolean }) => {
  const { gasLimit, setGasLimit, isGasLimitDragged } = useOrderFormStore();
  const { pricingPackageValues } = useBuy();
  const { maxGasLimit, minGasLimit, defaultGasLimit, stepGasLimit } =
    pricingPackageValues as PricingPackageValues;

  const onSliderChange = (value: number) => {
    setGasLimit(value.toString());
  };

  React.useEffect(() => {
    if (gasLimit !== (defaultGasLimit || '0') && gasLimit !== '-1') return;

    setGasLimit((defaultGasLimit || maxGasLimit).toString());
  }, [pricingPackageValues]);

  return (
    <LegoV3
      background={OrderFormOptions[ORDER_FIELD.GAS_LIMIT].background}
      label={isLeft ? '' : OrderFormOptions[ORDER_FIELD.GAS_LIMIT].subTitle}
      active={isGasLimitDragged}
      zIndex={4}
    >
      <Slider
        cb={onSliderChange}
        field={ORDER_FIELD.GAS_LIMIT}
        defaultValue={gasLimit}
        max={maxGasLimit}
        initValue={defaultGasLimit}
        min={minGasLimit}
        step={stepGasLimit}
        InitNoti={CannotModifiedNoti}
      />
    </LegoV3>
  );
};

export default React.memo(BlockGasLimitLego);
