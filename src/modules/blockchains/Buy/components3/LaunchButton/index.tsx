import React, { useMemo } from 'react';

import ImagePlaceholder from '@/components/ImagePlaceholder';

import s from './styles.module.scss';
import { FormOrder, ORDER_FIELD, useFormOrderStore } from '../../stores';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { useSearchParams } from 'next/navigation';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';

type Override = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD];

const LaunchButton = () => {
  const { computerNameField } = useBuy();
  const { hasError } = computerNameField;
  const { field, setForm } = useFormOrderStore((state) => state);
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || PRICING_PACKGE.Hacker;

  const { availableListFetching, availableList } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const isFecthingData = useMemo(() => {
    return availableListFetching || !availableList;
  }, [availableListFetching, availableList]);

  const tierData = useMemo(() => {
    const packageData = availableList?.package['2'];
    const result = packageData?.filter((item, index) => {
      if (item.value === Number(packageParam)) {
        return true;
      }
      return false;
    });
    return result ? result[0] : undefined;
  }, [isFecthingData, availableList, packageParam]);

  if (isFecthingData) return null;

  const allFilled = Object.keys(field).every(
    (key) => field[key as Override].dragged,
  );

  const handleOnClick = () => {
    const form: FormOrder = {
      chainName: field[ORDER_FIELD.CHAIN_NAME].value,
      network: field[ORDER_FIELD.NETWORK].value,
      dataAvaibilityChain: field[ORDER_FIELD.DATA_AVAILABILITY_CHAIN].value,
      gasLimit: field[ORDER_FIELD.GAS_LIMIT].value,
      withdrawPeriod: field[ORDER_FIELD.WITHDRAW_PERIOD].value,
    };

    console.log('[LaunchButton] handleOnClick -> form :: ', form);

    setForm(form);
  };

  return (
    <div
      className={`${s.launch} ${allFilled && !hasError ? s.active : ''}`}
      onClick={handleOnClick}
    >
      <div className={s.inner}>
        <p>Launch</p>
        <div className={`${s.icon}`}>
          <ImagePlaceholder
            src={'/launch.png'}
            alt={'launch'}
            width={48}
            height={48}
          />
        </div>
      </div>
      <p className={s.price}>{`${tierData?.price || '--'} (${
        tierData?.priceNote || '--'
      })`}</p>
    </div>
  );
};

export default LaunchButton;
