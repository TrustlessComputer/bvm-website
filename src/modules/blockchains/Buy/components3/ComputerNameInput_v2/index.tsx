import React, { useEffect, useRef } from 'react';
import { debounce, isEmpty } from 'lodash';
import toast from 'react-hot-toast';

import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { validateSubDomainAPI } from '@/services/api/l2services';
import { showError } from '@/components/toast';
import { FormFields, FormFieldsErrorMessage } from '../../Buy.constanst';
import { ORDER_FIELD, useFormOrderStore } from '../../stores';
import { getRandonComputerName } from '../../Buy.helpers';

import s from './styles.module.scss';
import { useDebounce } from '@/hooks/useDebounce';
import { useOrderFormStore } from '../../stores/index_v2';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';

type Props = {
  chainNameDefault?: string;
  isMainnet: boolean;
};

const ComputerNameInput = (props: Props) => {
  const { chainNameDefault, isMainnet } = props;
  const { setChainName, chainName } = useOrderFormStore();
  const { isCapture } = useCaptureStore();

  const onChangeHandler = React.useCallback(
    debounce(async (e: any) => {
      const text = e.target.value;
      let isValid = !isEmpty(text);
      let errorMessage = FormFieldsErrorMessage[FormFields.COMPUTER_NAME];

      if (isValid) {
        try {
          isValid = await validateSubDomainAPI(text);
        } catch (error: any) {
          errorMessage = error.toString() || 'Computer name is invalid';
          toast.error(errorMessage);
        } finally {
        }
      } else {
        toast.error(errorMessage);
      }

      setChainName(text);
    }, 500),
    [],
  );

  React.useEffect(() => {
    const computerName =
      chainNameDefault ??
      'My Little Blockchain ' + getRandonComputerName(isMainnet);

    setChainName(computerName);
  }, [chainNameDefault, isMainnet]);

  return (
    <div className={`${isCapture ? s.setLine : ''} ${s.wrapper_input}`}>
      <input
        type="text"
        placeholder="Enter chain name"
        className={`${s.input} `}
        value={chainName}
        onChange={(e) => {
          const text = e.target.value;
          setChainName(text);
          onChangeHandler(e);
        }}
      />
    </div>
  );
};

export default ComputerNameInput;
