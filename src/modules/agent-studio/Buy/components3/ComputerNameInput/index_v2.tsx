import { debounce, isEmpty } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { validateSubDomainAPI } from '@/services/api/l2services';
import { useComputerNameInputStore } from './ComputerNameInputStore';

import { useOrderFormStore } from '../../stores/index_v2';
import s from './styles.module.scss';

const PREFIX = 'My Bitcoin Chain';

const ComputerNameInput = () => {
  const { isCapture } = useCaptureStore();
  const { setChainName } = useOrderFormStore();
  const { isCreateChainFlow, isUpdateFlow, order, chainID } =
    useChainProvider();
  const {
    computerName,
    isComputerNameFocused,
    setComputerName,
    setComputerNameFocused,
    setComputerNameErrMsg,
  } = useComputerNameInputStore();

  const validateNameDebouce = useCallback(
    debounce(async (text: string | undefined) => {
      let isValid = true;
      let errorMsg = undefined;
      if (!text || isEmpty(text)) {
        isValid = false;
        errorMsg = 'Chain name is required.';
      } else {
        try {
          isValid = await validateSubDomainAPI(text);
        } catch (error: any) {
          errorMsg = error.toString() || 'Chain name is invalid';
        }
      }

      if (isValid) {
        setComputerNameErrMsg(undefined);
      } else {
        toast.error(errorMsg);
        setComputerNameErrMsg(errorMsg);
      }
    }, 500),
    [],
  );

  const onChangeHandler = (text: string | undefined) => {
    setChainName(text || '');
    setComputerName(text || '');
    validateNameDebouce(text);
  };

  useEffect(() => {
    let computerNameStr;
    if (isCreateChainFlow) {
      if (isComputerNameFocused) {
        computerNameStr = `${computerName}`;
      } else {
        computerNameStr = `${PREFIX} ${chainID}`;
      }
    } else {
      computerNameStr = order?.chainName || '';
    }
    setChainName(computerNameStr);
    setComputerName(computerNameStr);
  }, [isCreateChainFlow, order, chainID, isComputerNameFocused, computerName]);

  return (
    <div className={`${isCapture ? s.setLine : ''} ${s.wrapper_input}`}>
      <input
        type="text"
        placeholder="Enter chain name"
        className={`${s.input} ${isUpdateFlow ? s.notAllowed : ''}`}
        disabled={!!isUpdateFlow}
        value={computerName}
        onChange={(e: any) => {
          const text = e.target.value;
          onChangeHandler(text);
          setComputerNameFocused(true);
        }}
        onBlur={(e: any) => {
          const text = e.target.value;
          onChangeHandler(text);
          setComputerNameFocused(true);
        }}
      />
    </div>
  );
};

export default ComputerNameInput;
