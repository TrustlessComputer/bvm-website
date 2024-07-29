import { useState } from 'react';

import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import s from './styles.module.scss';

type Props = {};

const AddressInput = (props: Props) => {
  // const { setChainName } = useOrderFormStore();
  // const { value, errorMessage } = computerNameField;

  const [value, setValue] = useState('');

  const { isCapture } = useCaptureStore();

  const onChangeHandler = (text: string) => {
    setValue(text);
  };
  return (
    <div className={`${isCapture ? s.setLine : ''} ${s.wrapper_input}`}>
      <input
        type="text"
        placeholder="Enter Address"
        className={`${s.input} `}
        value={value}
        onChange={(e) => {
          const text = e.target.value;
          onChangeHandler(text);
        }}
      />
    </div>
  );
};

export default AddressInput;
