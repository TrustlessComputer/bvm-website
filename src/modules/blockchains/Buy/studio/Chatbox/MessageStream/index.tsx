import React from 'react';

import styles from './styles.module.scss';
import { blockLegoResponseToModelCategory } from '../utils/convertApiUtils';
import Lego from '../../../component4/Lego';
import useModelCategoriesStore from '../../../stores/useModelCategoriesStore';
import { useParseMessage } from '../hooks/usePasrMessage';
import { DappModel, IModelCategory } from '@/types/customize-model';
import { chainKeyToDappKey } from '../../../utils';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import useDappsStore from '../../../stores/useDappStore';
import useNodeHelper from '../../../hooks/useNodeHelper';
import useTemplate from '../../../hooks/useTemplate';

function MessageStream({ message }: { message: string }) {
  const { categories } = useModelCategoriesStore();
  const { setChatBoxStatus } = useChatBoxState((state) => state);
  const { dapps } = useDappsStore();
  const { addDappToNode } = useNodeHelper();
  const { setTemplate } = useTemplate();

  const [dappIndexesNeedToAdd, setDappIndexesNeedToAdd] = React.useState<
    {
      dappIndex: number;
      x: number;
      y: number;
    }[]
  >([]);
  const [isApplied, setIsApplied] = React.useState(false);
  const [generationStatus, setGenerationStatus] = React.useState({
    isGenerating: true,
    isGenerated: false,
    isGeneratingJson: false,
    isGeneratedJson: false,
    template: [] as IModelCategory[],
    beforeJsonBlock: '',
    afterJsonBlock: '',
  });

  const handleApply = () => {
    let count = 0;
    const _dappIndexesNeedToAdd: typeof dappIndexesNeedToAdd = [];
    generationStatus.template.forEach((template) => {
      template.options.forEach((option) => {
        const dappKey = chainKeyToDappKey(option.key);
        const dappIndex = dapps.findIndex((dA) => dA.key === dappKey);

        if (dappIndex !== -1 && !dapps[dappIndex].isDefaultDapp) {
          _dappIndexesNeedToAdd.push({
            dappIndex,
            x: 600 * (count + 1),
            y: 30,
          });
          count++;
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
    setTemplate(generationStatus.template);
    setIsApplied(true);
  };

  const trackMessageChange = () => {
    const messageHaveJson = message.includes('```json');
    const messageHaveDoneJsonBlock = message.split('```').length > 2;
    const beforeJsonBlock = message.split('```json')?.[0] || message;
    const messageHaveJsonBlock = message.split('```json')?.[1];
    const jsonBlock2 = messageHaveJsonBlock?.split('```')?.[0];
    const afterJsonBlock = messageHaveJsonBlock?.split('```')?.[1];

    if (!messageHaveJson) {
      setGenerationStatus({
        ...generationStatus,
        beforeJsonBlock: beforeJsonBlock.replaceAll('```', ''),
      });
    } else if (messageHaveJson && !generationStatus.isGeneratingJson) {
      setGenerationStatus({
        ...generationStatus,
        isGeneratingJson: true,
      });
    } else if (messageHaveDoneJsonBlock && generationStatus.isGeneratingJson) {
      setGenerationStatus({
        ...generationStatus,
        isGeneratingJson: false,
        isGeneratedJson: true,
        template: blockLegoResponseToModelCategory(
          categories!,
          JSON.parse(jsonBlock2 || '{}'),
        ),
      });
    } else if (generationStatus.isGeneratedJson) {
      setGenerationStatus({
        ...generationStatus,
        afterJsonBlock,
      });
    }
  };

  React.useEffect(() => {
    if (dappIndexesNeedToAdd.length > 0) {
      addDappToNode(dappIndexesNeedToAdd[0].dappIndex, {
        x: dappIndexesNeedToAdd[0].x,
        y: dappIndexesNeedToAdd[0].y,
      });

      setDappIndexesNeedToAdd(dappIndexesNeedToAdd.slice(1));
    }
  }, [dappIndexesNeedToAdd, addDappToNode]);

  React.useEffect(() => {
    trackMessageChange();
  }, [message]);

  return (
    <div className={styles.message}>
      {generationStatus.beforeJsonBlock}

      {generationStatus.isGeneratingJson &&
      !generationStatus.isGeneratedJson ? (
        <div>...</div>
      ) : null}

      {generationStatus.isGeneratedJson &&
      generationStatus.template.length > 0 ? (
        <>
          <div className={styles.categories}>
            {generationStatus.template.map((item) => (
              <div key={item.id} className={styles.category}>
                <h6 className={styles.categoryTitle}>Generated {item.title}</h6>

                <div className={styles.categoryOptions}>
                  {item.options.map((option) => (
                    <Lego
                      {...option}
                      background={item.color}
                      key={option.key}
                      titleInLeft
                      titleInRight={false}
                      first={false}
                      last={false}
                      legoAI
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {!isApplied && (
            <div className={styles.applyBtn} onClick={() => handleApply()}>
              Apply
            </div>
          )}
        </>
      ) : null}

      {generationStatus.afterJsonBlock}
    </div>
  );
}

export default React.memo(MessageStream);
