import React from 'react';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import useDappsStore from '../../../stores/useDappStore';
import useTemplate from '../../../hooks/useTemplate';
import { IModelCategory } from '@/types/customize-model';
import { chainKeyToDappKey } from '../../../utils';

const useBotMessageServices = () => {
  const { setChatBoxStatus } = useChatBoxState();
  const { dapps } = useDappsStore();
  const { setTemplate } = useTemplate();

  const [dappIndexesNeedToAdd, setDappIndexesNeedToAdd] = React.useState<
    {
      dappIndex: number;
      x: number;
      y: number;
    }[]
  >([]);

  const applyBotTemplate = (template: IModelCategory[]) => {
    const _dappIndexesNeedToAdd: typeof dappIndexesNeedToAdd = [];
    template.forEach((template) => {
      template.options.forEach((option) => {
        const dappKey = chainKeyToDappKey(option.key);
        const dappIndex = dapps.findIndex((dA) => dA.key === dappKey);

        if (dappIndex !== -1 && !dapps[dappIndex].isDefaultDapp) {
          _dappIndexesNeedToAdd.push({
            dappIndex,
            x: 0,
            y: 0,
          });
        }
      });
    });

    setDappIndexesNeedToAdd(_dappIndexesNeedToAdd);
    setChatBoxStatus({
      status: ChatBoxStatus.Close,
      isGenerating: false,
      isComplete: false,
      isListening: false,
    });
    setTemplate(template);
  };

  return {
    dappIndexesNeedToAdd,
    setDappIndexesNeedToAdd,
    applyBotTemplate,
  };
};

export default useBotMessageServices;
