import { debounce, isEmpty } from 'lodash';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { useCaptureStore } from '@/modules/agent-studio/Buy/stores/index_v3';
import { validateSubDomainAPI } from '@/services/api/l2services';
import { useAgentNameInputStore } from './store';

import s from './styles.module.scss';
import { Input } from '@chakra-ui/react';
import AppInput from '../../component_v5/AppInput';

const AgentNameInput = () => {
  const { isCapture } = useCaptureStore();
  const { agentName, setAgentName } = useAgentNameInputStore();

  const validateNameDebouce = useCallback(
    debounce(async (text: string | undefined) => {
      let isValid = true;
      let errorMsg = undefined;
      if (!text || isEmpty(text)) {
        isValid = false;
        errorMsg = 'Name is required.';
      } else {
        try {
          isValid = await validateSubDomainAPI(text);
        } catch (error: any) {
          errorMsg = error.toString() || 'name is invalid';
        }
      }

      if (isValid) {
        // setComputerNameErrMsg(undefined);
      } else {
        toast.error(errorMsg);
        // setComputerNameErrMsg(errorMsg);
      }
    }, 500),
    [],
  );

  const onChangeHandler = (text: string | undefined) => {
    setAgentName(text || '');
    // validateNameDebouce(text);
  };

  return (
    <div className={`${isCapture ? s.setLine : ''} ${s.wrapper_input}`}>
      <AppInput
        type="text"
        placeholder="Enter agent name"
        value={agentName}
        onChange={(e: any) => {
          const text = e.target.value;
          onChangeHandler(text);
        }}
        onBlur={(e: any) => {
          const text = e.target.value;
          onChangeHandler(text);
        }}
      />
    </div>
  );
};

export default AgentNameInput;
