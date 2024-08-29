import { IModelCategory } from '@/types/customize-model';
import { useCallback, useEffect, useState } from 'react';
import Lego from '../../../component4/Lego';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import styles from '../styles.module.scss';

export default function Message({
  message,
  template,
}: {
  message: string;
  template: IModelCategory[];
}) {
  const { setChatBoxStatus, isGenerating } = useChatBoxState((state) => state);

  const [displayedMessage, setDisplayedMessage] = useState<string>('');
  const [displayedTemplate, setDisplayedTemplate] = useState<typeof template>(
    [],
  );

  const animateMessage = useCallback(() => {
    let messageIndex = 0;
    let templateIndex = 0;
    let optionIndex = 0;

    setInterval(() => {
      if (messageIndex < message.length - 1) {
        setDisplayedMessage((prev) => prev + message[messageIndex]);
        messageIndex++;
      } else if (templateIndex < template.length) {
        const currentTemplate = template[templateIndex];

        if (optionIndex < currentTemplate.options.length) {
          setDisplayedTemplate((prev) => {
            const updatedTemplate = [...prev];

            if (!updatedTemplate[templateIndex]) {
              updatedTemplate[templateIndex] = {
                ...currentTemplate,
                options: [currentTemplate.options[optionIndex]],
              };
            } else {
              updatedTemplate[templateIndex].options.push(
                currentTemplate.options[optionIndex],
              );
            }

            optionIndex++;

            return updatedTemplate;
          });
        } else {
          templateIndex++;
          optionIndex = 0;
        }
      } else {
        setChatBoxStatus({
          status: ChatBoxStatus.Complete,
          isGenerating: false,
          isComplete: true,
          isListening: false,
        });
      }
    }, 30);
  }, [message, template]);

  useEffect(() => {
    if (isGenerating) {
      animateMessage();
    }
  }, [isGenerating]);

  return (
    <div>
      <div>{displayedMessage}</div>

      <div className={styles.categories}>
        {displayedTemplate.map((item) => (
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
    </div>
  );
}
