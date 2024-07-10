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
import LegoV3 from '../LegoV3';

type PricingPackageValues = {
  maxGasLimit: number;
  minGasLimit: number;
  defaultGasLimit?: number;
  stepGasLimit: number;
  defaultWithdrawalPeriod?: number;
  minWithdrawalPeriod: number;
  maxWithdrawalPeriod: number;
};

const WithdrawalTimeLego = ({ isLeft }: { isLeft: boolean }) => {
  const { field, setFormField } = useFormOrderStore();
  const { pricingPackageValues } = useBuy();

  const { defaultWithdrawalPeriod, minWithdrawalPeriod, maxWithdrawalPeriod } =
    pricingPackageValues as PricingPackageValues;

  React.useEffect(() => {
    setFormField(
      ORDER_FIELD.WITHDRAW_PERIOD,
      defaultWithdrawalPeriod || maxWithdrawalPeriod,
    );
  }, [pricingPackageValues]);

  return (
    <LegoV3
      background={'pink'}
      label={
        isLeft ? '' : OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD].subTitle
      }
      zIndex={6}
      active={field[ORDER_FIELD.WITHDRAW_PERIOD].dragged}
    >
      <Slider
        cb={setFormField}
        field={ORDER_FIELD.WITHDRAW_PERIOD}
        defaultValue={field[ORDER_FIELD.WITHDRAW_PERIOD].value}
        max={maxWithdrawalPeriod}
        suffix="hours"
        initValue={defaultWithdrawalPeriod}
        min={minWithdrawalPeriod}
        InitNoti={CannotModifiedNoti}
      />
    </LegoV3>
  );
};

export default WithdrawalTimeLego;
