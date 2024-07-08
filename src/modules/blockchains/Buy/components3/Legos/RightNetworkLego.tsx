import React from 'react';

import {
  ORDER_FIELD,
  useFormOrderStore,
} from '@/modules/blockchains/Buy/stores';

import { OrderFormOptions } from '../../Buy.data';
import Lego from '../Lego';
import Dropdown from '../Dropdown';

const RightNetworkLego = () => {
  const { field, setFormField } = useFormOrderStore();

  return (
    <Lego
      background={'brown'}
      label={OrderFormOptions[ORDER_FIELD.NETWORK].subTitle}
      zIndex={9}
      isFrist={false}
      isLast={false}
      isActive={field[ORDER_FIELD.NETWORK].dragged}
    >
      <Dropdown
        cb={setFormField}
        defaultValue={field[ORDER_FIELD.NETWORK].value}
        field={ORDER_FIELD.NETWORK}
        networkSelected={field[ORDER_FIELD.NETWORK].value}
        options={OrderFormOptions[ORDER_FIELD.NETWORK].options || []}
      />
    </Lego>
  );
};

export default RightNetworkLego;
