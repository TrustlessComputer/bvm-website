import React, { useMemo } from 'react';

import DotPulse from '@/components/DotPulse';
import Lego from '../../../component4/Lego';
import useNodeHelper from '../../../hooks/useNodeHelper';
import useTemplate from '../../../hooks/useTemplate';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../../../signals/useDragSignal';
import useDappsStore from '../../../stores/useDappStore';
import useModelCategoriesStore from '../../../stores/useModelCategoriesStore';
import { chainKeyToDappKey } from '../../../utils';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import { blockLegoResponseToModelCategory } from '../utils/convertApiUtils';
import styles from './styles.module.scss';
import { needReactFlowRenderSignal } from '../../ReactFlowRender';
import { formDappSignal } from '../../../signals/useFormDappsSignal';
import useStudioHelper from '../../../hooks/useStudioHelper';

function MessageStream({ message }: { message: string }) {
  const { categories } = useModelCategoriesStore();
  const { setChatBoxStatus } = useChatBoxState((state) => state);
  const { dapps } = useDappsStore();
  const { addDappToNode } = useNodeHelper();
  const { setTemplate } = useTemplate();
  const { clearFlow } = useStudioHelper();

  const countAdded = React.useRef(0);
  const [dappIndexesNeedToAdd, setDappIndexesNeedToAdd] = React.useState<
    {
      dappIndex: number;
      x: number;
      y: number;
    }[]
  >([]);
  const [isApplied, setIsApplied] = React.useState(false);

  const generationStatus = React.useMemo(() => {
    const messageHaveJson = message.includes('```json');
    const messageHaveDoneJsonBlock = message.split('```').length > 2;
    const beforeJsonBlock = message.split('```json')?.[0] || message;
    const messageHaveJsonBlock = message.split('```json')?.[1];
    const jsonBlock2 = messageHaveJsonBlock?.split('```')?.[0];
    const afterJsonBlock = messageHaveJsonBlock?.split('```')?.[1];

    return {
      beforeJsonBlock: beforeJsonBlock.replaceAll('```', ''),
      isGeneratingJson: messageHaveJson && !messageHaveDoneJsonBlock,
      isGeneratedJson: messageHaveDoneJsonBlock,
      template: messageHaveDoneJsonBlock
        ? blockLegoResponseToModelCategory(
            categories!,
            JSON.parse(jsonBlock2 || '{}'),
          )
        : [],
      afterJsonBlock,
    };
  }, [message]);

  const handleApply = () => {
    clearFlow();
    setIsApplied(true);
  };

  const apply = () => {
    setTimeout(() => {
      const _dappIndexesNeedToAdd: typeof dappIndexesNeedToAdd = [];
      generationStatus.template.forEach((template) => {
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
      setTemplate(generationStatus.template);
    }, 300);
  };

  React.useEffect(() => {
    if (dappIndexesNeedToAdd.length > 0) {
      const dappIndexNeedToAdd = dappIndexesNeedToAdd[0];

      if (
        !draggedDappIndexesSignal.value.includes(dappIndexNeedToAdd.dappIndex)
      ) {
        addDappToNode(dappIndexNeedToAdd.dappIndex, {
          x: 600 * (countAdded.current + 1),
          y: 30,
        });
        countAdded.current += 1;
      }

      setDappIndexesNeedToAdd(dappIndexesNeedToAdd.slice(1));
    }
  }, [dappIndexesNeedToAdd, addDappToNode]);

  React.useEffect(() => {
    if (isApplied) {
      apply();
    }
  }, [isApplied]);

  const isEmpty = useMemo(() => {
    return (
      (generationStatus.beforeJsonBlock || '').replaceAll(' ', '') === '' &&
      (generationStatus.afterJsonBlock || '').replaceAll(' ', '') === '' &&
      generationStatus.template.length === 0
    );
  }, [generationStatus]);

  return (
    <div className={styles.message}>
      {isEmpty ? <DotPulse /> : generationStatus.beforeJsonBlock}

      {generationStatus.isGeneratingJson &&
      !generationStatus.isGeneratedJson ? (
        <DotPulse />
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
