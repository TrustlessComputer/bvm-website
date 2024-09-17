import React from 'react';

import styles from './styles.module.scss';
import { blockLegoResponseToModelCategory } from '../utils/convertApiUtils';
import Lego from '../../../component4/Lego';
import useModelCategoriesStore from '../../../stores/useModelCategoriesStore';
import { useParseMessage } from '../hooks/usePasrMessage';
import { IModelCategory } from '@/types/customize-model';

export default function MessageStream({ message }: { message: string }) {
  const { categories } = useModelCategoriesStore();

  const [generationStatus, setGenerationStatus] = React.useState({
    isGenerating: true,
    isGenerated: false,
    isGeneratingJson: false,
    isGeneratedJson: false,
    template: [] as IModelCategory[],
    beforeJsonBlock: '',
    afterJsonBlock: '',
  });

  console.log('[MessageStream] message', {
    generationStatus,
  });

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
    trackMessageChange();
  }, [message]);

  return (
    <div className={styles.message}>
      {generationStatus.beforeJsonBlock}

      {generationStatus.isGeneratingJson &&
        !generationStatus.isGeneratedJson && <div>...</div>}

      <div className={styles.categories}>
        {generationStatus.isGeneratedJson &&
          generationStatus.template.map((item) => (
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

      {generationStatus.afterJsonBlock}
    </div>
  );
}
