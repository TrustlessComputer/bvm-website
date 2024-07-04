import React from 'react';

import ImagePlaceholder from '@/components/ImagePlaceholder';

import s from './styles.module.scss';
import { FormOrder, ORDER_FIELD, useFormOrderStore } from '../../stores';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';

type Override = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD];

const LaunchButton = () => {
  const { computerNameField } = useBuy();
  const { hasError } = computerNameField;

  const { field, setForm } = useFormOrderStore((state) => state);

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
  );
};

export default LaunchButton;
