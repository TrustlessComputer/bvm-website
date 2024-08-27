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
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';

type Props = {
  chainNameDefault?: string;
};

const ComputerNameInput = (props: Props) => {
  const { chainNameDefault } = props;
  const { setChainName } = useOrderFormStore();
  const { computerNameField, setComputerNameField, isMainnet } = useBuy();
  const { value, errorMessage } = computerNameField;
  const { isCapture } = useCaptureStore();

  const { isUpdateFlow, order } = useChainProvider();

  const onChangeHandler = React.useCallback(
    debounce(async (e: any) => {
      const text = e.target.value;
      let isValid = !isEmpty(text);
      let errorMessage = FormFieldsErrorMessage[FormFields.COMPUTER_NAME];
      let timer: NodeJS.Timeout | null = null;

      if (isValid) {
        try {
          isValid = await validateSubDomainAPI(text);

          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            setComputerNameField({
              ...computerNameField,
              value: text,
              hasError: !isValid,
              errorMessage: isValid ? undefined : errorMessage,
            });
          }, 100);
        } catch (error: any) {
          errorMessage = error.toString() || 'Computer name is invalid';
          toast.error(errorMessage);
        } finally {
        }
      } else {
        toast.error(errorMessage);
      }

      setChainName(text);
      setComputerNameField({
        ...computerNameField,
        value: text,
        hasFocused: true,
        hasError: !!computerNameField.isRequired && !isValid,
        errorMessage: isValid ? undefined : errorMessage,
      });
    }, 500),
    [],
  );

  React.useEffect(() => {
    const computerName = 'My Bitcoin Chain ' + getRandonComputerName(isMainnet);

    setChainName(computerName);
    setComputerNameField({
      ...computerNameField,
      value: computerName,
      hasFocused: true,
      hasError: false,
      errorMessage: undefined,
    });
  }, [chainNameDefault, isMainnet]);

  useEffect(() => {
    if (isUpdateFlow) {
      setComputerNameField({
        ...computerNameField,
        value: order?.chainName,
        hasError: false,
        errorMessage: undefined,
      });
    }
  }, [isUpdateFlow, order]);

  return (
    <div className={`${isCapture ? s.setLine : ''} ${s.wrapper_input}`}>
      <input
        type="text"
        placeholder="Enter chain name"
        className={`${s.input} `}
        disabled={!!isUpdateFlow}
        value={value}
        onChange={(e) => {
          const text = e.target.value;

          setComputerNameField({
            ...computerNameField,
            value: text,
          });

          onChangeHandler(e);
        }}
      />
    </div>
  );
};

export default ComputerNameInput;
