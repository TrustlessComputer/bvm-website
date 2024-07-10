import {
  ORDER_FIELD,
  useFormOrderStore,
} from '@/modules/blockchains/Buy/stores';

import { OrderFormOptions } from '../../Buy.data';
import Dropdown from '../Dropdown';
import LegoV3 from '../LegoV3';

const RightNetworkLego = () => {
  const { field, setFormField } = useFormOrderStore();

  return (
    <LegoV3
      background={'brown'}
      label={OrderFormOptions[ORDER_FIELD.NETWORK].subTitle}
      zIndex={11}
      active={field[ORDER_FIELD.NETWORK].dragged}
    >
      <Dropdown
        defaultValue={field[ORDER_FIELD.NETWORK].value}
        field={ORDER_FIELD.NETWORK}
        networkSelected={field[ORDER_FIELD.NETWORK].value}
        options={OrderFormOptions[ORDER_FIELD.NETWORK].options || []}
      />
    </LegoV3>
  );
};

export default RightNetworkLego;
