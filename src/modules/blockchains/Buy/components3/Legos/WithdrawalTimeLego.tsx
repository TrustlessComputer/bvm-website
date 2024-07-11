import React from 'react';

import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import {
  ORDER_FIELD,
  useOrderFormStore,
} from '@/modules/blockchains/Buy/stores/index_v2';

import { OrderFormOptions } from '../../Buy.data';
import Slider from '../Slider/index_v2';
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

const WithdrawalTimeLego = ({ isLeft = false }: { isLeft?: boolean }) => {
  const { withdrawPeriod, setWithdrawPeriod, isWithdrawPeriodDragged } =
    useOrderFormStore();
  const { pricingPackageValues } = useBuy();

  const { defaultWithdrawalPeriod, minWithdrawalPeriod, maxWithdrawalPeriod } =
    pricingPackageValues as PricingPackageValues;

  const onSliderChange = (value: number) => {
    setWithdrawPeriod(value);
  };

  React.useEffect(() => {
    if (withdrawPeriod !== defaultWithdrawalPeriod) return;

    setWithdrawPeriod(defaultWithdrawalPeriod || maxWithdrawalPeriod);
  }, [pricingPackageValues]);

  return (
    <LegoV3
      background={OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD].background}
      label={
        isLeft ? '' : OrderFormOptions[ORDER_FIELD.WITHDRAW_PERIOD].subTitle
      }
      zIndex={2}
      active={isWithdrawPeriodDragged}
    >
      <Slider
        cb={onSliderChange}
        field={ORDER_FIELD.WITHDRAW_PERIOD}
        defaultValue={withdrawPeriod}
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
