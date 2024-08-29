import { IModelCategory } from '@/types/customize-model';
import { useEffect, useState } from 'react';
import Lego from '../../../component4/Lego';
import useChatBoxState from '../chatbox-store';
import styles from '../styles.module.scss';

export default function Message({
  message,
  template,
}: {
  message: string;
  template: IModelCategory[];
}) {
  const { setIsGenerating, setIsComplete } = useChatBoxState((state) => state);

  const [displayedMessage, setDisplayedMessage] = useState<string>('');
  const [displayedTemplate, setDisplayedTemplate] = useState<typeof template>(
    [],
  );

  useEffect(() => {
    let messageIndex = 0;
    let templateIndex = 0;
    let optionIndex = 0;
    setIsGenerating(true);
    const intervalId = setInterval(() => {
      if (messageIndex < message.length) {
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
                options: [],
              };
            }
            updatedTemplate[templateIndex].options.push(
              currentTemplate.options[optionIndex],
            );
            return updatedTemplate;
          });
          optionIndex++;
        } else {
          templateIndex++;
          optionIndex = 0;
        }
      } else {
        clearInterval(intervalId);
        setIsGenerating(false);
        setIsComplete(true);
      }
    }, 30);

    return () => clearInterval(intervalId);
  }, [message, template]);

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
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
