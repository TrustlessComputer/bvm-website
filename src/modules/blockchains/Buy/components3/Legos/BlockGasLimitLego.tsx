import React from 'react';

import {
  ORDER_FIELD,
  useFormOrderStore,
} from '@/modules/blockchains/Buy/stores';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';

import { OrderFormOptions } from '../../Buy.data';
import LegoV3 from '../LegoV3';
import Slider from '../Slider';
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

const BlockGasLimitLego = ({ isLeft }: { isLeft: boolean }) => {
  const { field, setFormField } = useFormOrderStore();
  const { pricingPackageValues } = useBuy();

  const { maxGasLimit, minGasLimit, defaultGasLimit, stepGasLimit } =
    pricingPackageValues as PricingPackageValues;

  React.useEffect(() => {
    setFormField(ORDER_FIELD.GAS_LIMIT, defaultGasLimit || maxGasLimit);
  }, [pricingPackageValues]);

  return (
    <LegoV3
      background={'green'}
      label={isLeft ? '' : OrderFormOptions[ORDER_FIELD.GAS_LIMIT].subTitle}
      active={field[ORDER_FIELD.GAS_LIMIT].dragged}
      zIndex={7}
    >
      <Slider
        cb={setFormField}
        field={ORDER_FIELD.GAS_LIMIT}
        defaultValue={field[ORDER_FIELD.GAS_LIMIT].value}
        max={maxGasLimit}
        initValue={defaultGasLimit}
        min={minGasLimit}
        step={stepGasLimit}
        initNoti={CannotModifiedNoti}
      />
    </LegoV3>
  );
};

export default BlockGasLimitLego;