import React from 'react';

import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import {
  ORDER_FIELD,
  useFormOrderStore,
} from '@/modules/blockchains/Buy/stores';

import { OrderFormOptions } from '../../Buy.data';
import Slider from '../Slider';
import LegoV2 from '../LegoV2';
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
    <LegoV2
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
    </LegoV2>
  );
};

export default BlockGasLimitLego;
